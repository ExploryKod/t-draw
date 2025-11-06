#!/bin/bash
set -e

# Copy .env.production to .env if .env doesn't exist
if [ ! -f /var/www/html/.env ] && [ -f /var/www/html/.env.production ]; then
    cp /var/www/html/.env.production /var/www/html/.env
    echo "Copied .env.production to .env"
fi

# Clear Laravel caches
php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Execute the main command
exec "$@"

