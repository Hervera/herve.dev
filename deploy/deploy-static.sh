#!/usr/bin/env bash
set -euo pipefail

for variable in VPS_HOST VPS_USER VPS_PATH VPS_SSH_KEY VPS_KNOWN_HOSTS GITHUB_SHA GITHUB_RUN_ID GITHUB_RUN_ATTEMPT RUNNER_TEMP; do
  if [[ -z "${!variable:-}" ]]; then
    printf '::error::Missing required deployment setting: %s\n' "$variable" >&2
    exit 1
  fi
done

VPS_PORT="${VPS_PORT:-22}"
[[ "$VPS_PORT" =~ ^[0-9]+$ ]] && (( VPS_PORT > 0 && VPS_PORT < 65536 )) || { printf 'Invalid VPS_PORT\n' >&2; exit 1; }
[[ "$VPS_HOST" =~ ^[a-zA-Z0-9.-]+$ ]] || { printf 'VPS_HOST must be an IP address or SSH hostname\n' >&2; exit 1; }
[[ "$VPS_USER" =~ ^[a-zA-Z_][a-zA-Z0-9_-]*$ ]] || { printf 'Invalid VPS_USER\n' >&2; exit 1; }
[[ "$VPS_PATH" == /* && "$VPS_PATH" != / ]] || { printf 'VPS_PATH must be an absolute application directory, such as /var/www/herve.dev\n' >&2; exit 1; }
[[ "$GITHUB_SHA" =~ ^[0-9a-f]{40}$ && "$GITHUB_RUN_ID" =~ ^[0-9]+$ && "$GITHUB_RUN_ATTEMPT" =~ ^[0-9]+$ ]] || { printf 'Invalid GitHub release identifier\n' >&2; exit 1; }

key_directory="$(mktemp -d "$RUNNER_TEMP/herve-ssh.XXXXXX")"
trap 'rm -rf -- "$key_directory"' EXIT
printf '%s\n' "$VPS_SSH_KEY" | tr -d '\r' > "$key_directory/key"
printf '%s\n' "$VPS_KNOWN_HOSTS" > "$key_directory/known_hosts"
chmod 600 "$key_directory/key" "$key_directory/known_hosts"
common_options=(-i "$key_directory/key" -o BatchMode=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$key_directory/known_hosts" -o ConnectTimeout=15 -o ServerAliveInterval=15)
destination="$VPS_USER@$VPS_HOST"
release_id="$GITHUB_SHA-$GITHUB_RUN_ID-$GITHUB_RUN_ATTEMPT"
archive="$RUNNER_TEMP/herve-$release_id.tar.gz"
remote_archive="/tmp/herve-$release_id.tar.gz"

printf '%s\n' "$GITHUB_SHA" > out/deployment-version.txt
tar -czf "$archive" -C out .
scp -q -P "$VPS_PORT" "${common_options[@]}" "$archive" "$destination:$remote_archive"
printf -v arguments '%q ' "$VPS_PATH" "$release_id" "$remote_archive"
ssh -p "$VPS_PORT" "${common_options[@]}" "$destination" "bash -s -- $arguments" < deploy/activate-release.sh
