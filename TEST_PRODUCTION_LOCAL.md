# Tester la Configuration Production en Local

Ce guide explique comment tester la configuration Docker de production sur votre machine locale avant de déployer sur un VPS.

## 🎯 Objectif

Tester `docker-compose.prod.yml` en local avec :
- ✅ Certificats SSL auto-signés
- ✅ Configuration production
- ✅ WebSocket fonctionnel
- ✅ Tous les services (Nginx, PHP-FPM, MySQL, WebSocket)

## 📋 Prérequis

- Docker et Docker Compose installés
- Ports 80, 443, 8001 disponibles (ou modifiez-les)

## 🚀 Démarrage Rapide

### 1. Créer le fichier .env.production pour le test local

```bash
cp .env.production.example .env.production
```

### 2. Configurer .env.production pour le local

```env
APP_NAME=Colladraw
APP_ENV=production
APP_KEY=                    # Sera généré automatiquement
APP_DEBUG=false
APP_URL=https://localhost

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=colladraw_prod
DB_USERNAME=colladraw_user
DB_PASSWORD=test_password_123
DB_ROOT_PASSWORD=root_password_123

# WebSocket Configuration
WS_PORT=8001
WEBSOCKET_URL=https://localhost
ALLOWED_ORIGINS=https://localhost,http://localhost
```

### 3. Générer des certificats SSL auto-signés

```bash
# Créer le dossier SSL
mkdir -p docker/nginx/ssl

# Générer le certificat auto-signé
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/key.pem \
  -out docker/nginx/ssl/cert.pem \
  -subj "/C=FR/ST=State/L=City/O=Test/CN=localhost"

# Définir les permissions
chmod 644 docker/nginx/ssl/cert.pem
chmod 600 docker/nginx/ssl/key.pem
```

### 4. Lancer les conteneurs

```bash
# Option 1: Utiliser le script de déploiement
./deploy-prod.sh

# Option 2: Manuellement
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

### 5. Ajouter localhost au fichier hosts (optionnel)

Si vous voulez utiliser un nom de domaine local :

```bash
# Sur Linux/Mac
sudo nano /etc/hosts

# Ajouter cette ligne :
127.0.0.1 localhost t-draw.local
```

Puis dans `.env.production` :
```env
APP_URL=https://t-draw.local
ALLOWED_ORIGINS=https://t-draw.local,http://t-draw.local
```

### 6. Accepter le certificat auto-signé dans le navigateur

1. Ouvrez `https://localhost` (ou votre domaine local)
2. Le navigateur affichera un avertissement de sécurité
3. Cliquez sur "Avancé" → "Continuer vers localhost" (ou équivalent)
4. Le certificat sera accepté pour cette session

## 🔍 Vérifications

### Vérifier que les conteneurs tournent

```bash
docker compose -f docker-compose.prod.yml ps
```

Vous devriez voir :
- `t-draw-app` (PHP-FPM)
- `t-draw-websocket` (WebSocket)
- `t-draw-nginx` (Nginx)
- `t-draw-mysql-prod` (MySQL)

### Vérifier les logs

```bash
# Tous les services
docker compose -f docker-compose.prod.yml logs -f

# Service spécifique
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f websocket
docker compose -f docker-compose.prod.yml logs -f nginx
```

### Tester l'application

1. **Application Laravel** : `https://localhost`
2. **WebSocket** : Vérifier dans la console du navigateur que la connexion WebSocket fonctionne
3. **Base de données** : Les migrations doivent avoir été exécutées

### Tester le WebSocket

Ouvrez la console du navigateur (F12) et vérifiez :
- Pas d'erreurs de connexion WebSocket
- Message "Websocket connected" dans la console
- Les fonctionnalités collaboratives fonctionnent

## 🛠️ Commandes Utiles

### Redémarrer un service

```bash
docker compose -f docker-compose.prod.yml restart app
docker compose -f docker-compose.prod.yml restart websocket
```

### Exécuter des commandes Artisan

```bash
docker compose -f docker-compose.prod.yml exec app php artisan migrate
docker compose -f docker-compose.prod.yml exec app php artisan tinker
```

### Accéder au shell du conteneur

```bash
docker compose -f docker-compose.prod.yml exec app bash
docker compose -f docker-compose.prod.yml exec websocket sh
```

### Voir les logs en temps réel

```bash
docker compose -f docker-compose.prod.yml logs -f --tail=100
```

### Arrêter tout

```bash
docker compose -f docker-compose.prod.yml down
```

### Arrêter et supprimer les volumes (⚠️ supprime la base de données)

```bash
docker compose -f docker-compose.prod.yml down -v
```

## 🐛 Dépannage

### Erreur "certificate verify failed"

C'est normal avec des certificats auto-signés. Acceptez l'exception dans le navigateur.

### Port déjà utilisé

Si les ports 80, 443 ou 8001 sont déjà utilisés, modifiez `docker-compose.prod.yml` :

```yaml
nginx:
  ports:
    - "8080:80"      # Au lieu de "80:80"
    - "8443:443"     # Au lieu de "443:443"

websocket:
  ports:
    - "8002:8001"    # Au lieu de "8001:8001"
```

Puis mettez à jour `.env.production` :
```env
APP_URL=https://localhost:8443
WS_PORT=8002
```

### WebSocket ne se connecte pas

1. Vérifier les logs WebSocket :
   ```bash
   docker compose -f docker-compose.prod.yml logs websocket
   ```

2. Vérifier que `ALLOWED_ORIGINS` inclut votre URL locale

3. Vérifier la configuration Nginx pour `/socket.io/`

### Erreur de base de données

1. Vérifier que MySQL est démarré :
   ```bash
   docker compose -f docker-compose.prod.yml ps mysql
   ```

2. Vérifier les logs MySQL :
   ```bash
   docker compose -f docker-compose.prod.yml logs mysql
   ```

3. Tester la connexion :
   ```bash
   docker compose -f docker-compose.prod.yml exec app php artisan migrate:status
   ```

## 📝 Différences avec la Production Réelle

| Aspect | Local (Test) | Production |
|--------|-------------|------------|
| Certificat SSL | Auto-signé | Let's Encrypt |
| Domaine | localhost | Votre domaine |
| Base de données | Conteneur local | Conteneur (même setup) |
| Accès | Local uniquement | Internet |

## ✅ Checklist de Test

- [ ] Les conteneurs démarrent sans erreur
- [ ] L'application est accessible en HTTPS
- [ ] Le certificat SSL est accepté (auto-signé)
- [ ] La base de données fonctionne
- [ ] Les migrations sont exécutées
- [ ] Le WebSocket se connecte
- [ ] Les fonctionnalités collaboratives fonctionnent
- [ ] Les logs ne montrent pas d'erreurs critiques

## 🚀 Prochaines Étapes

Une fois les tests locaux réussis :

1. Préparer votre VPS
2. Configurer le domaine réel
3. Obtenir un certificat Let's Encrypt
4. Déployer avec `./deploy-prod.sh`

