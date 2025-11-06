FROM php:8.2-fpm

ARG WWW_USER=1000

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    zlib1g-dev \
    zip \
    unzip \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    curl \
    intl \
    opcache

# Create user with same UID as host user (configurable via build arg)
RUN groupadd --force -g $WWW_USER webapp \
    && useradd -ms /bin/bash --no-user-group -g $WWW_USER -u $WWW_USER webapp

# Configure PHP-FPM
RUN sed -i 's/listen = \/run\/php\/php8.2-fpm.sock/listen = 0.0.0.0:9000/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/;clear_env = no/clear_env = no/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/user = www-data/user = webapp/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/group = www-data/group = webapp/' /usr/local/etc/php-fpm.d/www.conf

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY --chown=webapp:webapp . /var/www/html

# Copy .env.production if it exists (for build-time config)
COPY --chown=webapp:webapp .env.production* ./

# Validate PHP version compatibility before installing dependencies
RUN php -r " \
    \$composerJson = json_decode(file_get_contents('composer.json'), true); \
    \$requiredPhp = \$composerJson['require']['php'] ?? '^8.0'; \
    \$currentVersion = PHP_VERSION; \
    \
    # Extract minimum version from requirement (e.g., '^8.2' -> '8.2.0') \
    if (preg_match('/\^?(\d+)\.(\d+)/', \$requiredPhp, \$matches)) { \
        \$minMajor = (int)\$matches[1]; \
        \$minMinor = (int)\$matches[2]; \
        \$currentMajor = (int)explode('.', \$currentVersion)[0]; \
        \$currentMinor = (int)explode('.', \$currentVersion)[1]; \
        \
        if (\$currentMajor < \$minMajor || (\$currentMajor == \$minMajor && \$currentMinor < \$minMinor)) { \
            echo \"ERROR: PHP version mismatch!\\n\"; \
            echo \"Required: \$requiredPhp\\n\"; \
            echo \"Current: \$currentVersion\\n\"; \
            echo \"Please update Dockerfile to use PHP \$minMajor.\$minMinor or higher.\\n\"; \
            exit(1); \
        } \
    } \
    echo \"PHP version check passed: \$currentVersion satisfies \$requiredPhp\\n\"; \
    " || exit 1

# Install Composer dependencies (production)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node.js and build assets
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm ci --production=false \
    && npm run production \
    && rm -rf node_modules \
    && apt-get purge -y nodejs npm \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Set proper permissions for Laravel
RUN chown -R webapp:webapp /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Clean cache
RUN apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Note: PHP-FPM will run as webapp user (configured in www.conf)
# We keep root for the container to allow PHP-FPM to bind to port 9000
# The PHP-FPM worker processes will run as webapp user

# Expose PHP-FPM port
EXPOSE 9000

CMD ["php-fpm"]
