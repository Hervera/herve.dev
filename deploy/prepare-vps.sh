#!/usr/bin/env bash
set -euo pipefail

# One-time Ubuntu/Nginx preparation. Run as root and pass the deployment PUBLIC
# key as the first argument. The private key stays in GitHub Actions secrets.
public_key="${1:?Pass the deployment public key}"
[[ "$(id -u)" == 0 ]] || { printf 'Run this setup as root.\n' >&2; exit 1; }
[[ "$public_key" == ssh-ed25519\ * && "$public_key" != *$'\n'* ]] || { printf 'Expected one Ed25519 public key.\n' >&2; exit 1; }
command -v nginx >/dev/null
command -v python3 >/dev/null

if ! id herve-deploy >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash herve-deploy
fi
install -d -m 755 -o herve-deploy -g herve-deploy /var/www/herve.dev /var/www/herve.dev/releases
install -d -m 700 -o herve-deploy -g herve-deploy /home/herve-deploy/.ssh
touch /home/herve-deploy/.ssh/authorized_keys
chown herve-deploy:herve-deploy /home/herve-deploy/.ssh/authorized_keys
chmod 600 /home/herve-deploy/.ssh/authorized_keys
if ! grep -Fq -- "$public_key" /home/herve-deploy/.ssh/authorized_keys; then
  printf 'restrict %s\n' "$public_key" >> /home/herve-deploy/.ssh/authorized_keys
fi

install -d -m 755 /var/www/letsencrypt /etc/nginx/snippets
if [[ ! -e /etc/nginx/sites-available/herve.dev ]]; then
  cat > /etc/nginx/sites-available/herve.dev <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name herve.dev;
    root /var/www/herve.dev/current;
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
    }
    location / {
        try_files $uri.html $uri $uri/ =404;
    }
}
NGINX
  ln -s /etc/nginx/sites-available/herve.dev /etc/nginx/sites-enabled/herve.dev
  nginx -t
  systemctl reload nginx
fi

if ! command -v certbot >/dev/null; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y certbot
fi
printf 'Prepared herve-deploy and /var/www/herve.dev. Request the herve.dev certificate after DNS points to this VPS.\n'
