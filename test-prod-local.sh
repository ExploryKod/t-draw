#!/bin/bash
# Script pour tester la configuration production en local
# Usage: ./test-prod-local.sh

set -e

echo "🧪 Test de la configuration production en local"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier Docker
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker n'est pas en cours d'exécution${NC}"
    exit 1
fi

# Vérifier docker-compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ docker-compose n'est pas installé${NC}"
    exit 1
fi

COMPOSE_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    COMPOSE_CMD="docker-compose"
fi

echo -e "${GREEN}✓ Docker est disponible${NC}"
echo ""

# Vérifier si .env.production existe
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}⚠️  .env.production n'existe pas${NC}"
    if [ -f .env.production.example ]; then
        echo "📝 Création de .env.production depuis .env.production.example..."
        cp .env.production.example .env.production
        echo -e "${GREEN}✓ Fichier créé${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  IMPORTANT: Modifiez .env.production avec vos valeurs de test local${NC}"
        echo "   APP_URL=https://localhost"
        echo "   ALLOWED_ORIGINS=https://localhost,http://localhost"
        echo ""
        read -p "Appuyez sur Entrée après avoir modifié .env.production..."
    else
        echo -e "${RED}❌ .env.production.example n'existe pas${NC}"
        exit 1
    fi
fi

# Vérifier/créer les certificats SSL
if [ ! -f docker/nginx/ssl/cert.pem ] || [ ! -f docker/nginx/ssl/key.pem ]; then
    echo -e "${YELLOW}⚠️  Certificats SSL manquants${NC}"
    echo "🔐 Génération de certificats SSL auto-signés..."
    
    mkdir -p docker/nginx/ssl
    
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout docker/nginx/ssl/key.pem \
      -out docker/nginx/ssl/cert.pem \
      -subj "/C=FR/ST=Test/L=Test/O=Test/CN=localhost" 2>/dev/null
    
    chmod 644 docker/nginx/ssl/cert.pem
    chmod 600 docker/nginx/ssl/key.pem
    
    echo -e "${GREEN}✓ Certificats générés${NC}"
    echo ""
else
    echo -e "${GREEN}✓ Certificats SSL trouvés${NC}"
fi

# Vérifier les ports
echo "🔍 Vérification des ports..."
PORTS_IN_USE=()

if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -tuln 2>/dev/null | grep -q ':80 '; then
    PORTS_IN_USE+=("80")
fi

if lsof -Pi :443 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -tuln 2>/dev/null | grep -q ':443 '; then
    PORTS_IN_USE+=("443")
fi

if lsof -Pi :8001 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -tuln 2>/dev/null | grep -q ':8001 '; then
    PORTS_IN_USE+=("8001")
fi

if [ ${#PORTS_IN_USE[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Ports déjà utilisés: ${PORTS_IN_USE[*]}${NC}"
    echo "   Vous devrez peut-être arrêter d'autres services ou modifier docker-compose.prod.yml"
    echo ""
    read -p "Continuer quand même ? (o/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[OoYy]$ ]]; then
        exit 0
    fi
else
    echo -e "${GREEN}✓ Ports disponibles${NC}"
fi

echo ""

# Générer APP_KEY si nécessaire
if ! grep -q "APP_KEY=base64:" .env.production; then
    echo "🔑 Génération de APP_KEY..."
    APP_KEY=$(docker run --rm php:8.1-cli php -r "echo 'base64:'.base64_encode(random_bytes(32));" 2>/dev/null || echo "")
    if [ -n "$APP_KEY" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env.production
        else
            sed -i "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env.production
        fi
        echo -e "${GREEN}✓ APP_KEY généré${NC}"
    fi
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
$COMPOSE_CMD -f docker-compose.prod.yml down 2>/dev/null || true

# Construire les images
echo "🏗️  Construction des images Docker..."
$COMPOSE_CMD -f docker-compose.prod.yml build --no-cache

# Démarrer les conteneurs
echo "🚀 Démarrage des conteneurs..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d

# Attendre que MySQL soit prêt
echo "⏳ Attente du démarrage de MySQL..."
sleep 10

# Vérifier l'état des conteneurs
echo ""
echo "📊 État des conteneurs:"
$COMPOSE_CMD -f docker-compose.prod.yml ps

echo ""

# Exécuter les migrations
echo "🗄️  Exécution des migrations..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan migrate --force 2>/dev/null || echo -e "${YELLOW}⚠️  Erreur lors des migrations (peut être normal si déjà exécutées)${NC}"

# Optimiser Laravel
echo "⚡ Optimisation de Laravel..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan config:cache 2>/dev/null || true
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan route:cache 2>/dev/null || true
$COMPOSE_CMD -f docker-compose.prod.yml exec -T app php artisan view:cache 2>/dev/null || true

# Résumé
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Configuration production démarrée en local !${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}🌐 Accès à l'application:${NC}"
echo "   HTTPS: https://localhost"
echo "   (Acceptez le certificat auto-signé dans votre navigateur)"
echo ""
echo -e "${YELLOW}📊 Commandes utiles:${NC}"
echo "   Voir les logs:     $COMPOSE_CMD -f docker-compose.prod.yml logs -f"
echo "   Arrêter:           $COMPOSE_CMD -f docker-compose.prod.yml down"
echo "   Redémarrer:        $COMPOSE_CMD -f docker-compose.prod.yml restart"
echo "   État:              $COMPOSE_CMD -f docker-compose.prod.yml ps"
echo ""
echo -e "${YELLOW}⚠️  Note:${NC}"
echo "   Le certificat SSL est auto-signé, votre navigateur affichera un avertissement."
echo "   C'est normal pour les tests locaux."
echo ""

