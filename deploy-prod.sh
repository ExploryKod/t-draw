#!/bin/bash
# Production deployment script for t-draw using Docker
# Usage: ./deploy-prod.sh

set -e

echo "🚀 Starting Docker production deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production not found!"
    echo "📝 Copy .env.production.example to .env.production and configure it"
    echo "   cp .env.production.example .env.production"
    echo "   nano .env.production"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: docker-compose is not installed!"
    exit 1
fi

# Use docker compose (newer) or docker-compose (older)
COMPOSE_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    COMPOSE_CMD="docker-compose"
fi

echo "✅ Using: $COMPOSE_CMD"

# Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env.production; then
    echo "🔑 Generating application key..."
    # Generate key using PHP in a temporary container
    APP_KEY=$(docker run --rm php:8.1-cli php -r "echo 'base64:'.base64_encode(random_bytes(32));")
    # Update .env.production
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env.production
    else
        sed -i "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env.production
    fi
    echo "✅ Application key generated"
fi

# Build and start containers
echo "🏗️  Building Docker images..."
$COMPOSE_CMD -f docker-compose.prod.yml build --no-cache

echo "🚀 Starting containers..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan migrate --force

# Clear and cache configuration
echo "🧹 Clearing and optimizing caches..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan config:clear
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan route:clear
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan view:clear
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan cache:clear

# Optimize for production
echo "⚡ Optimizing for production..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan config:cache
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan route:cache
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan view:cache

# Set permissions
echo "🔒 Setting storage permissions..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app chown -R www-data:www-data /var/www/html/storage
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app chown -R www-data:www-data /var/www/html/bootstrap/cache
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app chmod -R 775 /var/www/html/storage
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app chmod -R 775 /var/www/html/bootstrap/cache

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Container status:"
$COMPOSE_CMD -f docker-compose.prod.yml ps
echo ""
echo "📝 Next steps:"
echo "1. Set up SSL certificates in docker/nginx/ssl/"
echo "2. Update nginx config with your domain name"
echo "3. Check logs: $COMPOSE_CMD -f docker-compose.prod.yml logs -f"
echo ""
echo "🔍 Useful commands:"
echo "  View logs:        $COMPOSE_CMD -f docker-compose.prod.yml logs -f"
echo "  Stop containers:  $COMPOSE_CMD -f docker-compose.prod.yml down"
echo "  Restart:          $COMPOSE_CMD -f docker-compose.prod.yml restart"
echo ""

