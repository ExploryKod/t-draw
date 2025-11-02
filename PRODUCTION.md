# Production Deployment Guide - t-draw

## 🎯 Recommended: VPS Deployment

Your app requires a **VPS** because:
- ✅ Node.js WebSocket server must run continuously
- ✅ Full control over server configuration
- ✅ Real-time collaborative features work better

## 📋 Prerequisites (VPS)

- Ubuntu 20.04+ or similar Linux distribution
- PHP 8.0.2+ with extensions: mbstring, xml, bcmath, gd
- Composer
- Node.js 16+ and npm
- MySQL 8.0+
- Nginx or Apache
- PM2 (for WebSocket server)
- SSL Certificate (Let's Encrypt)

## 🚀 Deployment Steps

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install -y php8.1 php8.1-fpm php8.1-mysql php8.1-mbstring php8.1-xml php8.1-bcmath php8.1-gd

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install MySQL
sudo apt install -y mysql-server
```

### 2. Clone & Configure

```bash
# Clone your repository
cd /var/www
sudo git clone YOUR_REPO_URL t-draw
sudo chown -R $USER:$USER t-draw
cd t-draw

# Create production environment file
cp .env.production.example .env.production
nano .env.production  # Configure with your production values
```

### 3. Configure .env.production

Update these key values:
- `APP_URL=https://yourdomain.com`
- `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `WS_PORT=8001`
- `WEBSOCKET_URL=https://ws.yourdomain.com` (or use same domain with different port)

### 4. Deploy

```bash
# Run deployment script
chmod +x deploy.sh
./deploy.sh

# Or manually:
cp .env.production .env
composer install --no-dev --optimize-autoloader
npm ci
npm run production
php artisan key:generate --force
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Configure Nginx

Create `/etc/nginx/sites-available/t-draw`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/t-draw/public;
    index index.php;
    
    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Laravel application
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # Static files
    location ~* \.(jpg|jpeg|gif|png|css|js|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
    
    # WebSocket proxy (if using subdomain)
    # For same domain, you can skip this
    location /socket.io/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/t-draw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Set Up WebSocket Server with PM2

```bash
cd /var/www/t-draw

# Update ecosystem.config.js with correct path
nano websocket/ecosystem.config.js

# Start WebSocket server
pm2 start websocket/ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 startup
pm2 startup
# Follow the command it outputs
```

### 7. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 8. Set Permissions

```bash
sudo chown -R www-data:www-data /var/www/t-draw/storage
sudo chown -R www-data:www-data /var/www/t-draw/bootstrap/cache
sudo chmod -R 775 /var/www/t-draw/storage
sudo chmod -R 775 /var/www/t-draw/bootstrap/cache
```

## 🔄 Updates (Without Affecting Local)

```bash
cd /var/www/t-draw

# Backup production env
cp .env .env.backup

# Pull latest code
git pull origin main  # or your branch

# Run deployment
./deploy.sh
# OR manually run deployment steps

# Restart services
pm2 restart t-draw-websocket
sudo systemctl reload php8.1-fpm
sudo systemctl reload nginx
```

## 📊 Monitoring

```bash
# Check WebSocket server
pm2 status
pm2 logs t-draw-websocket

# Check Laravel logs
tail -f storage/logs/laravel.log

# Check Nginx
sudo tail -f /var/log/nginx/error.log
```

## 🔒 Security Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] Strong database passwords
- [ ] SSL certificate installed
- [ ] Firewall configured (UFW)
- [ ] Regular backups
- [ ] PM2 process auto-restarts
- [ ] File permissions set correctly

## 🌐 Alternative: WebSocket on Same Domain

If you want WebSocket on same domain (port 443), configure Nginx to proxy `/socket.io/` to `localhost:8001` (see Nginx config above).

## 📝 Environment Variables Summary

- **APP_ENV**: `production`
- **APP_DEBUG**: `false`
- **WS_PORT**: Port for WebSocket server (e.g., `8001`)
- **WEBSOCKET_URL**: Full URL where WebSocket is accessible
- **DB_*****: Production database credentials

## 🆘 Troubleshooting

**WebSocket not connecting:**
- Check PM2: `pm2 status`
- Check firewall: `sudo ufw status`
- Check WebSocket URL in .env matches frontend

**500 errors:**
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Check permissions: `ls -la storage bootstrap/cache`
- Clear cache: `php artisan optimize:clear`

**Assets not loading:**
- Run: `npm run production`
- Check `public/mix-manifest.json` exists

