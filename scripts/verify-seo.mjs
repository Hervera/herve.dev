import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { access, readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const staticMode = process.argv.includes('--static');
const externalOrigin = process.env.SEO_ORIGIN ? new URL(process.env.SEO_ORIGIN).origin : undefined;
assert.ok(!staticMode || !externalOrigin, 'Use either --static or SEO_ORIGIN, not both');
const mainRoutes = ['/', '/about', '/contact', '/projects', '/resume'];
const slugs = ['pindo-sms-platform', 'tuzaride-web-app', 'quick-credit-backend', 'tuzaride-mobile-app', 'quick-credit-frontend', 'abahuza-real-estate', 'hope-of-family-cms', 'ecommerce-frontend', 'ecommerce-backend'];
const expectedRoutes = [...mainRoutes, ...slugs.map(slug => `/projects/${slug}`)].sort();
let child;
let origin = externalOrigin;
let serverLog = '';

const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attribute => [attribute[1], decode(attribute[2])])));
const meta = (html, name) => tags(html, 'meta').find(tag => tag.name === name || tag.property === name)?.content;
const canonical = html => tags(html, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href);

async function read(path) {
  if (staticMode) {
    const filename = path === '/' ? 'index.html' : /\.(xml|txt)$/.test(path) ? path.slice(1) : `${path.slice(1)}.html`;
    return readFile(join(root, 'out', filename), 'utf8');
  }
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  return response.text();
}

async function* assets(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) yield* assets(join(directory, entry.name), `${name}/`);
    else yield name;
  }
}

try {
  if (!staticMode && !externalOrigin) {
    await access(join(root, '.next/BUILD_ID'));
    const socket = createServer();
    socket.listen(0, '127.0.0.1');
    await once(socket, 'listening');
    const port = socket.address().port;
    await new Promise(resolve => socket.close(resolve));
    origin = `http://127.0.0.1:${port}`;
    child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
      cwd: root, env: process.env, stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.stdout.on('data', data => { serverLog += data; });
    child.stderr.on('data', data => { serverLog += data; });
    child.on('error', error => { serverLog += error.message; });
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      try { if ((await fetch(`${origin}/robots.txt`)).ok) { ready = true; break; } } catch { /* Wait for startup. */ }
      if (child.exitCode !== null) throw new Error(serverLog);
      await delay(250);
    }
    assert.ok(ready, `Production server failed to start:\n${serverLog}`);
  }

  const sitemap = await read('/sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(decode(match[1])));
  assert.deepEqual(urls.map(url => url.pathname).sort(), expectedRoutes, 'Sitemap must include every original route exactly once');
  const siteOrigin = urls[0].origin;
  if (externalOrigin) assert.equal(siteOrigin, externalOrigin, 'Live sitemap must use the deployed public origin');
  const robots = await read('/robots.txt');
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \/(?:\r?\n|$)/);

  const titles = new Set();
  const descriptions = new Set();
  const bundles = new Set();
  for (const url of urls) {
    assert.equal(url.origin, siteOrigin);
    const pageUrl = url.pathname === '/' ? url.origin : url.href;
    const html = await read(url.pathname);
    for (const tag of [...tags(html, 'script'), ...tags(html, 'link')]) {
      const asset = tag.src ?? tag.href;
      if (asset?.startsWith('/_next/') && /\.(js|css)(?:\?|$)/.test(asset)) bundles.add(asset);
    }
    if (staticMode) {
      const payload = url.pathname === '/' ? 'index.txt' : `${url.pathname.slice(1)}.txt`;
      assert.ok((await readFile(join(root, 'out', payload))).length > 0, `${url.pathname}: client-navigation payload exported`);
    }
    // Inspect actual HTML, not the serialized React payload. This also verifies no-JS crawlability.
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '');
    const description = meta(html, 'description');
    assert.ok(title.includes('Hervé Nkurikiyimfura'), `${url.pathname}: owner in title`);
    assert.ok(description?.length > 40, `${url.pathname}: useful description`);
    assert.ok(!titles.has(title), `${url.pathname}: unique title`);
    assert.ok(!descriptions.has(description), `${url.pathname}: unique description`);
    titles.add(title);
    descriptions.add(description);
    assert.deepEqual(canonical(html), [pageUrl], `${url.pathname}: exactly one absolute canonical`);
    assert.equal(meta(html, 'og:url'), pageUrl);
    assert.equal(meta(html, 'og:title'), title);
    assert.equal(meta(html, 'og:description'), description);
    assert.equal(meta(html, 'twitter:title'), title);
    assert.equal(meta(html, 'twitter:description'), description);
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image');
    assert.ok(meta(html, 'og:image')?.startsWith(`${siteOrigin}/`));
    assert.ok(meta(html, 'twitter:image')?.startsWith(`${siteOrigin}/`));
    assert.match(meta(html, 'robots') ?? '', /^index,\s*follow/);
    assert.doesNotMatch(html, /<meta[^>]+content="[^"]*noindex/);
    assert.match(html, /<html[^>]+lang="en"/);
    assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${url.pathname}: one rendered main heading`);
    assert.match(html, /<main[^>]+id="main-content"/);
    const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    assert.ok(schemas.some(schema => schema['@graph']?.some(node => node['@type'] === 'Person')));
    assert.ok(schemas.some(schema => schema['@graph']?.some(node => node['@type'] === 'WebSite')));
    assert.ok(schemas.some(schema => schema['@type'] === 'WebPage' && schema.url === pageUrl));
    if (url.pathname !== '/') assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'));
    if (url.pathname.startsWith('/projects/')) {
      for (const heading of ['Problem', 'Constraints', 'Approach', 'Results', 'Learnings']) {
        assert.ok(html.includes(`<h3>${heading}</h3>`), `${url.pathname}: rendered ${heading}`);
      }
      assert.ok(schemas.some(schema => schema.mainEntity?.['@type'] === 'CreativeWork'));
    }
  }

  for (const bundle of bundles) {
    if (staticMode) await access(join(root, 'out', bundle.slice(1).split('?')[0]));
    else assert.equal((await fetch(`${origin}${bundle}`)).status, 200, `${bundle}: browser bundle available`);
  }

  const projects = await read('/projects');
  const caseStudyLinks = tags(projects, 'a').filter(tag => tag.href?.startsWith('/projects/'));
  assert.deepEqual(caseStudyLinks.map(tag => tag.href).sort(), slugs.map(slug => `/projects/${slug}`).sort(), 'Every project has a rendered crawlable link');
  assert.equal(tags(projects, 'select').length, 2, 'Both project filters are rendered');
  const resume = await read('/resume');
  assert.match(resume, /<iframe[^>]+title="Resume PDF"/);
  assert.ok(tags(resume, 'a').some(tag => tag.href === '/Herve_Nkurikiyimfura_Full-Stack-Software_Engineer.pdf'));

  let assetCount = 0;
  for await (const asset of assets(join(root, 'public'))) {
    const original = await readFile(join(root, 'public', asset));
    if (staticMode) assert.deepEqual(await readFile(join(root, 'out', asset)), original, `${asset}: exported unchanged`);
    else {
      const response = await fetch(`${origin}/${asset.split('/').map(encodeURIComponent).join('/')}`);
      assert.equal(response.status, 200, `${asset}: available`);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), original, `${asset}: served unchanged`);
    }
    assetCount++;
  }

  if (staticMode) {
    const missing = await readFile(join(root, 'out/404.html'), 'utf8');
    assert.match(meta(missing, 'robots') ?? '', /noindex/);
    assert.ok(missing.includes('404 — Page not found'));
  } else {
    assert.deepEqual(canonical(await read('/about?source=seo-check')), [`${siteOrigin}/about`]);
    for (const path of ['/missing-page', '/projects/missing-project', '/projects/toString']) {
      const response = await fetch(`${origin}${path}`, { headers: { accept: 'text/html' } });
      assert.equal(response.status, 404, `${path}: real HTTP 404`);
      const html = await response.text();
      assert.ok(tags(html, 'meta').some(tag => tag.name === 'robots' && /noindex/.test(tag.content)), `${path}: noindex`);
      assert.ok(html.includes('404 — Page not found'));
      assert.deepEqual(canonical(html), [], `${path}: no misleading canonical`);
    }
  }
  if (externalOrigin && process.env.DEPLOYMENT_SHA) {
    const response = await fetch(`${origin}/deployment-version.txt?revision=${encodeURIComponent(process.env.DEPLOYMENT_SHA)}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, 'Live deployment version must be available');
    assert.equal((await response.text()).trim(), process.env.DEPLOYMENT_SHA, 'Cloudflare must serve the newly deployed commit');
  }
  if (externalOrigin && process.env.SEO_WWW_ORIGIN) {
    const wwwOrigin = new URL(process.env.SEO_WWW_ORIGIN).origin;
    for (const path of ['/', '/projects', '/projects/pindo-sms-platform?source=www-check&view=case-study']) {
      const response = await fetch(`${wwwOrigin}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      assert.ok([301, 308].includes(response.status), `${wwwOrigin}${path}: permanent redirect`);
      assert.equal(response.headers.get('location'), new URL(path, `${externalOrigin}/`).href, `${path}: redirect preserves the path and query`);
      await response.body?.cancel();
    }
    console.log('Verified www HTTPS and permanent redirects to the canonical domain, including paths and query strings.');
  }
  console.log(`Verified all ${urls.length} ${staticMode ? 'exported' : externalOrigin ? 'live' : 'production'} pages: unique SEO metadata, canonical/social URLs, JSON-LD, rendered content, crawlable links, sitemap, robots, resume, and ${assetCount} public assets${staticMode ? ', plus exported 404' : ', plus real HTTP 404 responses'}.`);
} finally {
  if (child && child.exitCode === null) {
    child.kill('SIGTERM');
    await once(child, 'exit');
  }
}
