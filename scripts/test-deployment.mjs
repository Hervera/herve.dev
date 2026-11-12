import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, readlink, realpath, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const directory = await mkdtemp(join(tmpdir(), 'herve-deployment-test-'));
const archives = [];
const files = ['index.html', 'projects.html', 'about.html', 'resume.html', 'contact.html', '404.html', 'sitemap.xml', 'robots.txt'];

async function release(number, incomplete = false, base = join(directory, 'app')) {
  const sha = String(number).repeat(40);
  const id = `${sha}-${process.pid}-${number}`;
  const fixture = join(directory, id);
  const archive = `/tmp/herve-${id}.tar.gz`;
  archives.push(archive);
  await mkdir(join(fixture, '_next/static'), { recursive: true });
  for (const file of files) {
    if (incomplete && file === 'sitemap.xml') continue;
    await writeFile(join(fixture, file), 'https://herve.dev');
  }
  await writeFile(join(fixture, 'deployment-version.txt'), `${sha}\n`);
  const packageResult = spawnSync('tar', ['-czf', archive, '-C', fixture, '.'], { encoding: 'utf8' });
  assert.equal(packageResult.status, 0, packageResult.stderr);
  const result = spawnSync('bash', [join(root, 'deploy/activate-release.sh'), base, id, archive], { encoding: 'utf8' });
  return { result, path: join(base, 'releases', id) };
}

try {
  const current = join(directory, 'app/current');
  const first = await release(1);
  assert.equal(first.result.status, 0, first.result.stderr);
  assert.equal(await readlink(current), first.path);
  const second = await release(2);
  assert.equal(second.result.status, 0, second.result.stderr);
  assert.equal(await readlink(current), second.path);
  await access(join(first.path, 'index.html'));
  const incomplete = await release(3, true);
  assert.notEqual(incomplete.result.status, 0, 'Incomplete releases must fail');
  assert.equal(await readlink(current), second.path, 'An incomplete release must preserve the working site');
  const otherApp = join(directory, 'existing-site');
  await mkdir(join(otherApp, 'current'), { recursive: true });
  await writeFile(join(otherApp, 'current/keep.txt'), 'existing content');
  const blocked = await release(4, false, otherApp);
  assert.notEqual(blocked.result.status, 0, 'Existing directories must never be replaced');
  await access(join(otherApp, 'current/keep.txt'));
  const invalid = spawnSync('bash', [join(root, 'deploy/activate-release.sh'), '/', 'invalid', '/tmp/invalid'], { encoding: 'utf8' });
  assert.notEqual(invalid.status, 0);
  assert.equal(await realpath(current), await realpath(second.path));
  console.log('Verified atomic release activation, previous-release retention, incomplete-release protection, existing-directory protection, and invalid-input rejection.');
} finally {
  await Promise.all(archives.map(archive => rm(archive, { force: true })));
  await rm(directory, { recursive: true, force: true });
}
