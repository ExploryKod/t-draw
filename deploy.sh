#!/bin/bash
# Production deployment script for t-draw
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production not found!"
    echo "📝 Copy .env.production.example to .env.production and configure it"
    exit 1
fi

# Backup current .env if exists
if [ -f .env ]; then
    echo "💾 Backing up current .env to .env.local"
    cp .env .env.local
fi

# Use production environment
cp .env.production .env
echo "✅ Using production environment"

# Install/Update Composer dependencies (production only, no dev)
echo "📦 Installing Composer dependencies (production)..."
composer install --no-dev --optimize-autoloader

# Install/Update NPM dependencies
echo "📦 Installing NPM dependencies..."
npm ci --production=false

# Compile production assets
echo "🎨 Compiling production assets..."
npm run production

# Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache configuration
echo "🧹 Clearing and optimizing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Set permissions
echo "🔒 Setting storage permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || echo "⚠️  Could not change ownership (may need sudo)"

echo "✅ Deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Restart your web server (Nginx/Apache)"
echo "2. Start the WebSocket server (see websocket/README.md)"
echo "3. Set up process manager (PM2) for WebSocket server"

