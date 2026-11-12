#!/usr/bin/env bash
set -euo pipefail

base="${1:?Application directory is required}"
release_id="${2:?Release identifier is required}"
archive="${3:?Archive is required}"
[[ "$base" == /* && "$base" != / ]] || { printf 'Invalid application directory\n' >&2; exit 1; }
[[ "$release_id" =~ ^[0-9a-f]{40}-[0-9]+-[0-9]+$ ]] || { printf 'Invalid release identifier\n' >&2; exit 1; }
[[ "$archive" == "/tmp/herve-$release_id.tar.gz" ]] || { printf 'Invalid archive path\n' >&2; exit 1; }

# Only a new, validated release can replace the current symlink. Existing
# releases and unrelated sites are retained, including when validation fails.
release="$base/releases/$release_id"
mkdir -p -- "$base/releases"
if [[ -e "$base/current" && ! -L "$base/current" ]]; then
  printf 'The current path exists and is not a symlink; refusing to replace it.\n' >&2
  exit 1
fi
mkdir -- "$release"
tar --no-same-owner -xzf "$archive" -C "$release"
for file in index.html projects.html about.html resume.html contact.html 404.html sitemap.xml robots.txt deployment-version.txt; do
  test -s "$release/$file" || { printf 'Incomplete release: %s is missing\n' "$file" >&2; exit 1; }
done
test -d "$release/_next/static"
expected_sha="${release_id%%-*}"
test "$(cat "$release/deployment-version.txt")" = "$expected_sha"
grep -Fq 'https://herve.dev' "$release/sitemap.xml"

temporary_link="$base/.current-$release_id"
ln -s -- "$release" "$temporary_link"
python3 - "$temporary_link" "$base/current" <<'PY'
import os
import sys
os.replace(sys.argv[1], sys.argv[2])
PY
printf 'Activated release %s\n' "$release_id"
