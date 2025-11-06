#!/bin/bash
# Script to generate and add APP_KEY to .env.production

echo "Generating APP_KEY..."
APP_KEY=$(docker compose -f docker-compose.prod.yml exec -T app php artisan key:generate --show 2>/dev/null | grep -o 'base64:[^[:space:]]*')

if [ -z "$APP_KEY" ]; then
    echo "Failed to generate key via artisan, generating manually..."
    APP_KEY="base64:$(openssl rand -base64 32 | tr -d '\n')"
fi

echo "Generated APP_KEY: $APP_KEY"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "ERROR: .env.production file not found!"
    echo "Please create it first or copy from .env.example"
    exit 1
fi

# Check if APP_KEY already exists
if grep -q "^APP_KEY=" .env.production; then
    echo "APP_KEY already exists in .env.production"
    echo "Current value:"
    grep "^APP_KEY=" .env.production
    echo ""
    read -p "Do you want to replace it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Replace existing APP_KEY
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|^APP_KEY=.*|APP_KEY=$APP_KEY|" .env.production
        else
            # Linux
            sed -i "s|^APP_KEY=.*|APP_KEY=$APP_KEY|" .env.production
        fi
        echo "APP_KEY updated in .env.production"
    else
        echo "Keeping existing APP_KEY"
    fi
else
    # Add APP_KEY if it doesn't exist
    echo "APP_KEY=$APP_KEY" >> .env.production
    echo "APP_KEY added to .env.production"
fi

echo ""
echo "Restarting app container to apply changes..."
docker compose -f docker-compose.prod.yml restart app

echo ""
echo "Clearing Laravel caches..."
docker compose -f docker-compose.prod.yml exec app php artisan config:clear
docker compose -f docker-compose.prod.yml exec app php artisan cache:clear

echo ""
echo "Done! Check if the app works now: http://194.164.76.63:30000"

