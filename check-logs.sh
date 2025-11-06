#!/bin/bash
# Quick script to check logs on VPS

echo "=== Checking container status ==="
docker compose -f docker-compose.prod.yml ps

echo -e "\n=== Nginx logs (last 20 lines) ==="
docker compose -f docker-compose.prod.yml logs --tail=20 nginx

echo -e "\n=== App logs (last 20 lines) ==="
docker compose -f docker-compose.prod.yml logs --tail=20 app

echo -e "\n=== Laravel error log (last 30 lines) ==="
docker compose -f docker-compose.prod.yml exec app tail -30 /var/www/html/storage/logs/laravel.log 2>/dev/null || echo "Log file not found or empty"

echo -e "\n=== Checking .env file ==="
docker compose -f docker-compose.prod.yml exec app cat /var/www/html/.env | grep -E "APP_KEY|APP_URL|DB_" | head -10

echo -e "\n=== Checking storage permissions ==="
docker compose -f docker-compose.prod.yml exec app ls -la /var/www/html/storage/logs/ | head -5

