# SSL Certificates

Place your SSL certificates here:

- `cert.pem` - SSL certificate
- `key.pem` - Private key

## Using Let's Encrypt with Docker

You can use certbot with Docker:

```bash
docker run -it --rm \
  -v "$(pwd)/docker/nginx/ssl:/etc/letsencrypt" \
  -v "$(pwd)/docker/nginx/ssl:/var/www/certbot" \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com

# Copy certificates
cp docker/nginx/ssl/live/yourdomain.com/fullchain.pem docker/nginx/ssl/cert.pem
cp docker/nginx/ssl/live/yourdomain.com/privkey.pem docker/nginx/ssl/key.pem
```

## Self-signed (Development Only)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/key.pem \
  -out docker/nginx/ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

