# Déploiement avec une Adresse IP (sans domaine)

Ce guide explique comment déployer t-draw sur un VPS en utilisant uniquement une adresse IP, sans nom de domaine.

## 📋 Configuration avec IP

### Variables d'environnement (.env.production)

```env
APP_NAME=Colladraw
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=http://YOUR_IP_ADDRESS

# Exemple avec IP 192.168.1.100
# APP_URL=http://192.168.1.100

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=colladraw_prod
DB_USERNAME=colladraw_user
DB_PASSWORD=your_secure_password
DB_ROOT_PASSWORD=your_root_password

# WebSocket Configuration
WS_PORT=8001
WEBSOCKET_URL=http://YOUR_IP_ADDRESS
ALLOWED_ORIGINS=http://YOUR_IP_ADDRESS

# Exemple avec IP 192.168.1.100
# WEBSOCKET_URL=http://192.168.1.100
# ALLOWED_ORIGINS=http://192.168.1.100
```

**Important:** Remplacez `YOUR_IP_ADDRESS` par votre IP publique (ex: `192.168.1.100` ou `203.0.113.45`)

## 🔒 SSL avec IP (Optionnel)

### Option 1: HTTP uniquement (Recommandé pour IP)

Utilisez HTTP au lieu de HTTPS. C'est plus simple et fonctionne bien pour un accès interne ou de test.

**Configuration Nginx modifiée:**

Créez `docker/nginx/conf.d/app-ip.conf` :

```nginx
# Upstream for PHP-FPM
upstream php-fpm {
    server app:9000;
}

# Upstream for WebSocket
upstream websocket {
    server websocket:8001;
}

# HTTP server (pas de redirection HTTPS)
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/html/public;
    index index.php index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Laravel application
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass php-fpm;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    # WebSocket proxy
    location /socket.io/ {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }

    # Static files
    location ~* \.(jpg|jpeg|gif|png|css|js|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Deny access to sensitive files
    location ~ ^/(\.env|composer\.(json|lock)|package(-lock)?\.json|\.git|README\.md|PRODUCTION\.md|Dockerfile|docker-compose\.(yml|yaml)) {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

Puis modifiez `docker-compose.prod.yml` pour utiliser cette config :

```yaml
nginx:
  volumes:
    - ./public:/var/www/html/public:ro
    - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - ./docker/nginx/conf.d/app-ip.conf:/etc/nginx/conf.d/app.conf:ro  # Utiliser app-ip.conf
    # Pas besoin de SSL
  ports:
    - "80:80"  # HTTP uniquement
    # Pas de 443
```

### Option 2: HTTPS avec certificat auto-signé

Si vous voulez HTTPS (avec avertissement de certificat), utilisez un certificat auto-signé :

```bash
# Générer un certificat pour l'IP
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/key.pem \
  -out docker/nginx/ssl/cert.pem \
  -subj "/C=FR/ST=State/L=City/O=Organization/CN=YOUR_IP_ADDRESS" \
  -addext "subjectAltName=IP:YOUR_IP_ADDRESS"

chmod 644 docker/nginx/ssl/cert.pem
chmod 600 docker/nginx/ssl/key.pem
```

**Note:** Les navigateurs afficheront un avertissement de sécurité avec un certificat auto-signé.

## 🚀 Déploiement

### 1. Sur votre VPS

```bash
# Cloner le repo
cd /opt
sudo git clone YOUR_REPO_URL t-draw
cd t-draw

# Créer .env.production
cp .env.production.example .env.production
nano .env.production
```

### 2. Configurer .env.production

```env
APP_URL=http://VOTRE_IP
WEBSOCKET_URL=http://VOTRE_IP
ALLOWED_ORIGINS=http://VOTRE_IP
```

### 3. Déployer

```bash
# Si vous utilisez HTTP uniquement, créez d'abord app-ip.conf
# (voir Option 1 ci-dessus)

chmod +x deploy-prod.sh
./deploy-prod.sh
```

### 4. Configurer le Firewall

```bash
# Autoriser les ports nécessaires
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS (si utilisé)
sudo ufw allow 8001/tcp  # WebSocket direct (optionnel)
sudo ufw enable
```

## 🌐 Accès à l'application

Une fois déployé, accédez à :
- **HTTP:** `http://VOTRE_IP`
- **HTTPS (si configuré):** `https://VOTRE_IP` (avec avertissement de certificat)

## ⚠️ Limitations avec IP

1. **Pas de Let's Encrypt:** Les certificats Let's Encrypt nécessitent un nom de domaine
2. **Avertissements SSL:** Les certificats auto-signés affichent des avertissements
3. **CORS:** Assurez-vous que `ALLOWED_ORIGINS` correspond exactement à votre IP

## 💡 Recommandations

### Obtenir un domaine gratuit

Pour une meilleure expérience, considérez un domaine gratuit :

- **Freenom** (`.tk`, `.ml`, `.ga`, `.cf`) - Gratuit
- **No-IP** - Sous-domaine gratuit
- **DuckDNS** - Sous-domaine gratuit

Avec un domaine, vous pouvez :
- ✅ Utiliser Let's Encrypt (SSL gratuit)
- ✅ Meilleure expérience utilisateur
- ✅ Plus facile à mémoriser

### Configuration avec sous-domaine gratuit

Si vous obtenez un sous-domaine (ex: `t-draw.duckdns.org`) :

```env
APP_URL=http://t-draw.duckdns.org
WEBSOCKET_URL=http://t-draw.duckdns.org
ALLOWED_ORIGINS=http://t-draw.duckdns.org
```

Puis configurez le DNS pour pointer vers votre IP.

## 🔍 Vérification

```bash
# Vérifier que l'application répond
curl http://VOTRE_IP

# Vérifier le WebSocket
curl -I http://VOTRE_IP/socket.io/

# Voir les logs
docker compose -f docker-compose.prod.yml logs -f
```

## 📝 Exemple Complet

Si votre IP est `203.0.113.45` :

**.env.production:**
```env
APP_URL=http://203.0.113.45
WEBSOCKET_URL=http://203.0.113.45
ALLOWED_ORIGINS=http://203.0.113.45
WS_PORT=8001
```

**Accès:**
- Application: `http://203.0.113.45`
- WebSocket: `http://203.0.113.45/socket.io/`

