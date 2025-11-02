# Docker Production Deployment Guide - t-draw

## 🎯 Overview

This guide explains how to deploy t-draw on a VPS using Docker and Docker Compose. This is the **recommended approach** as it's easier, more maintainable, and isolates your application.

## 📋 Prerequisites

- VPS with Ubuntu 20.04+ (or similar)
- Docker installed
- Docker Compose installed
- Domain name pointing to your VPS IP
- SSH access to your VPS

## 🚀 Quick Start

### 1. On Your Local Machine

```bash
# Ensure all files are committed
git add .
git commit -m "Production Docker setup"
git push origin main
```

### 2. On Your VPS

```bash
# Clone repository
cd /opt
sudo git clone YOUR_REPO_URL t-draw
cd t-draw

# Create production environment file
cp .env.production.example .env.production
nano .env.production  # Configure with your production values
```

### 3. Configure .env.production

```env
APP_NAME=Colladraw
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=colladraw_prod
DB_USERNAME=colladraw_user
DB_PASSWORD=your_secure_password
DB_ROOT_PASSWORD=your_root_password

WS_PORT=8001
WEBSOCKET_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

### 4. Set Up SSL Certificates

**Option A: Let's Encrypt (Recommended)**

```bash
# Install certbot if not using Docker
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates to Docker directory
sudo mkdir -p docker/nginx/ssl
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/nginx/ssl/key.pem
sudo chmod 644 docker/nginx/ssl/cert.pem
sudo chmod 600 docker/nginx/ssl/key.pem
```

**Option B: Self-signed (Development/Testing Only)**

```bash
mkdir -p docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/key.pem \
  -out docker/nginx/ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=yourdomain.com"
```

### 5. Build and Start Containers

```bash
# Build images
docker compose -f docker-compose.prod.yml build

# Generate Laravel key if not set
docker compose -f docker-compose.prod.yml run --rm app php artisan key:generate

# Run migrations
docker compose -f docker-compose.prod.yml run --rm app php artisan migrate --force

# Set permissions
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Start all services
docker compose -f docker-compose.prod.yml up -d

# View logs
docker compose -f docker-compose.prod.yml logs -f
```

### 6. Verify Deployment

```bash
# Check all containers are running
docker compose -f docker-compose.prod.yml ps

# Check logs
docker compose -f docker-compose.prod.yml logs app
docker compose -f docker-compose.prod.yml logs websocket
docker compose -f docker-compose.prod.yml logs nginx
```

## 🔄 Updates (Zero Downtime)

```bash
cd /opt/t-draw

# Pull latest code
git pull origin main

# Rebuild and restart
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Run migrations if needed
docker compose -f docker-compose.prod.yml run --rm app php artisan migrate --force

# Clear caches
docker compose -f docker-compose.prod.yml run --rm app php artisan optimize:clear
docker compose -f docker-compose.prod.yml run --rm app php artisan config:cache
docker compose -f docker-compose.prod.yml run --rm app php artisan route:cache
```

## 📊 Monitoring

```bash
# Container status
docker compose -f docker-compose.prod.yml ps

# Application logs
docker compose -f docker-compose.prod.yml logs -f app

# WebSocket logs
docker compose -f docker-compose.prod.yml logs -f websocket

# Nginx logs
docker compose -f docker-compose.prod.yml logs -f nginx

# Laravel logs (inside container)
docker compose -f docker-compose.prod.yml exec app tail -f storage/logs/laravel.log
```

## 🔧 Useful Commands

```bash
# Access Laravel container
docker compose -f docker-compose.prod.yml exec app bash

# Run artisan commands
docker compose -f docker-compose.prod.yml exec app php artisan ...

# Restart specific service
docker compose -f docker-compose.prod.yml restart websocket

# Stop all services
docker compose -f docker-compose.prod.yml down

# Stop and remove volumes (⚠️ deletes data)
docker compose -f docker-compose.prod.yml down -v

# View resource usage
docker stats
```

## 🔒 Security Checklist

- [ ] `APP_DEBUG=false` in .env.production
- [ ] Strong database passwords
- [ ] SSL certificates installed and valid
- [ ] Firewall configured (UFW)
- [ ] Regular backups of MySQL volume
- [ ] Container auto-restart enabled
- [ ] Sensitive files in .dockerignore
- [ ] No secrets in Dockerfile

## 🗄️ Database Backups

```bash
# Backup database
docker compose -f docker-compose.prod.yml exec mysql mysqldump -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} > backup_$(date +%Y%m%d).sql

# Restore database
docker compose -f docker-compose.prod.yml exec -T mysql mysql -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} < backup.sql
```

## 🔄 SSL Certificate Renewal (Let's Encrypt)

```bash
# Renew certificate
sudo certbot renew

# Copy new certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/nginx/ssl/key.pem

# Reload Nginx
docker compose -f docker-compose.prod.yml restart nginx
```

## 🆘 Troubleshooting

### Containers won't start
```bash
# Check logs
docker compose -f docker-compose.prod.yml logs

# Check container status
docker compose -f docker-compose.prod.yml ps
```

### WebSocket not connecting
- Verify `WS_PORT` in .env.production matches docker-compose.prod.yml
- Check `ALLOWED_ORIGINS` includes your domain
- Verify Nginx proxy config for `/socket.io/`
- Check websocket container logs: `docker compose -f docker-compose.prod.yml logs websocket`

### 502 Bad Gateway
- Check if app container is running: `docker compose -f docker-compose.prod.yml ps`
- Check PHP-FPM logs: `docker compose -f docker-compose.prod.yml logs app`

### Database connection errors
- Verify database credentials in .env.production
- Check MySQL container: `docker compose -f docker-compose.prod.yml ps mysql`
- Test connection: `docker compose -f docker-compose.prod.yml exec app php artisan migrate:status`

## 📝 Environment Variables

Key variables in `.env.production`:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://yourdomain.com`
- `DB_HOST=mysql` (container name)
- `WS_PORT=8001` (WebSocket port)
- `ALLOWED_ORIGINS=https://yourdomain.com` (CORS for WebSocket)

## 🎯 Architecture

```
Internet
    ↓
Nginx (Port 80/443)
    ↓
├──→ PHP-FPM (Laravel App)
├──→ WebSocket Server (Port 8001)
└──→ MySQL (Port 3306, internal only)
```

All services run in Docker containers with automatic restart on failure.

## 🔄 Migration from Non-Docker Setup

If you already have a non-Docker setup:

1. Backup your database
2. Copy your `.env.production` file
3. Follow the Quick Start guide above
4. Import your database backup

