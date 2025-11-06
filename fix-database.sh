#!/bin/bash
# Script to fix database connection issues

echo "=== Checking MySQL container ==="
docker compose -f docker-compose.prod.yml ps mysql

echo ""
echo "=== Checking database credentials from .env.production ==="
if [ -f .env.production ]; then
    grep -E "DB_|MYSQL_" .env.production | grep -v "^#"
else
    echo "ERROR: .env.production not found!"
    exit 1
fi

echo ""
echo "=== Testing MySQL connection ==="
echo "Attempting to connect to MySQL container..."

# Get database credentials from .env.production
DB_ROOT_PASSWORD=$(grep "^DB_ROOT_PASSWORD=" .env.production | cut -d '=' -f2 | tr -d '"' | tr -d "'")
DB_DATABASE=$(grep "^DB_DATABASE=" .env.production | cut -d '=' -f2 | tr -d '"' | tr -d "'")
DB_USERNAME=$(grep "^DB_USERNAME=" .env.production | cut -d '=' -f2 | tr -d '"' | tr -d "'")
DB_PASSWORD=$(grep "^DB_PASSWORD=" .env.production | cut -d '=' -f2 | tr -d '"' | tr -d "'")

if [ -z "$DB_ROOT_PASSWORD" ]; then
    echo "ERROR: DB_ROOT_PASSWORD not set in .env.production"
    exit 1
fi

echo "Root password: ${DB_ROOT_PASSWORD:0:3}***"
echo "Database: $DB_DATABASE"
echo "Username: $DB_USERNAME"
echo ""

# Test root connection
echo "Testing root connection..."
docker compose -f docker-compose.prod.yml exec -T mysql mysql -uroot -p"$DB_ROOT_PASSWORD" -e "SELECT 1;" 2>&1 | head -5

if [ $? -eq 0 ]; then
    echo "✓ Root connection successful"
else
    echo "✗ Root connection failed"
    exit 1
fi

echo ""
echo "=== Creating database and user if they don't exist ==="
docker compose -f docker-compose.prod.yml exec -T mysql mysql -uroot -p"$DB_ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS \`$DB_DATABASE\`;
CREATE USER IF NOT EXISTS '$DB_USERNAME'@'%' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON \`$DB_DATABASE\`.* TO '$DB_USERNAME'@'%';
FLUSH PRIVILEGES;
SELECT 'Database and user created successfully' AS status;
EOF

echo ""
echo "=== Testing user connection ==="
docker compose -f docker-compose.prod.yml exec -T mysql mysql -u"$DB_USERNAME" -p"$DB_PASSWORD" -D"$DB_DATABASE" -e "SELECT 'Connection successful' AS status;" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Database connection successful!"
    echo ""
    echo "Now you can run migrations:"
    echo "docker compose -f docker-compose.prod.yml exec app php artisan migrate --force"
else
    echo ""
    echo "✗ Database connection failed"
    echo "Please check your credentials in .env.production"
fi

