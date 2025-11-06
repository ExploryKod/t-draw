#!/bin/bash
# Fix permissions in running container

echo "=== Fixing permissions ==="

# Fix ownership
docker compose -f docker-compose.prod.yml exec app chown -R webapp:webapp /var/www/html

# Fix storage and cache permissions
docker compose -f docker-compose.prod.yml exec app chmod -R 775 /var/www/html/storage
docker compose -f docker-compose.prod.yml exec app chmod -R 775 /var/www/html/bootstrap/cache

# Make artisan executable
docker compose -f docker-compose.prod.yml exec app chmod +x /var/www/html/artisan

# Fix all files to be readable/executable by webapp
docker compose -f docker-compose.prod.yml exec app find /var/www/html -type f -exec chmod 644 {} \;
docker compose -f docker-compose.prod.yml exec app find /var/www/html -type d -exec chmod 755 {} \;
docker compose -f docker-compose.prod.yml exec app chmod +x /var/www/html/artisan

echo ""
echo "=== Testing artisan command ==="
docker compose -f docker-compose.prod.yml exec app php artisan --version

echo ""
echo "=== Checking permissions ==="
docker compose -f docker-compose.prod.yml exec app ls -la /var/www/html/artisan
docker compose -f docker-compose.prod.yml exec app ls -ld /var/www/html/storage
docker compose -f docker-compose.prod.yml exec app ls -ld /var/www/html/bootstrap/cache

echo ""
echo "Done! Try running artisan commands now."

