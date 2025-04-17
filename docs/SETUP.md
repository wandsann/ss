# Configuração do Ambiente - Saúde Conectada

## Pré-requisitos

### Sistema Operacional
- Ubuntu 20.04 LTS ou superior
- 8GB RAM mínimo
- 20GB espaço em disco

### Dependências Globais
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (v20.x) e npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v

# Instalar Docker e Docker Compose
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Instalar Redis
sudo apt install -y redis-server
sudo systemctl enable redis
sudo systemctl start redis

# Instalar dependências globais
npm install -g yarn turbo pm2
```

## Configuração do Projeto

### Clonar Repositório
```bash
git clone https://github.com/seu-usuario/saude-conectada.git
cd saude-conectada
```

### Instalar Dependências
```bash
# Instalar dependências do monorepo
yarn install

# Instalar dependências do frontend mobile
cd packages/frontend-app
yarn install

# Instalar dependências do frontend web
cd ../frontend-web
yarn install

# Instalar dependências do backend
cd ../backend
yarn install
```

### Configurar Banco de Dados
```bash
# Configurar PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE saude_conectada;"
sudo -u postgres psql -c "CREATE USER saude_user WITH PASSWORD 'Saude123!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE saude_conectada TO saude_user;"

# Verificar Redis
redis-cli ping  # Deve retornar "PONG"
```

### Configurar Variáveis de Ambiente
```bash
# Criar arquivo .env
cat <<EOL > .env
DATABASE_URL="postgresql://saude_user:Saude123!@localhost:5432/saude_conectada"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="sua-chave-secreta-256-bits"
AWS_ACCESS_KEY_ID="mock-key"
AWS_SECRET_ACCESS_KEY="mock-secret"
FIREBASE_CONFIG="mock-config"
GOOGLE_CLIENT_ID="mock-id"
FACEBOOK_APP_ID="mock-id"
APPLE_CLIENT_ID="mock-id"
EOL
```

## Iniciar Desenvolvimento

### Frontend Mobile (React Native)
```bash
cd packages/frontend-app
yarn start  # Inicia Metro Bundler
yarn android  # Emulador Android
# Ou yarn ios (se em macOS com Xcode)
```

### Frontend Web (React)
```bash
cd packages/frontend-web
yarn dev  # Inicia Vite com hot-reload
```

### Backend (Node.js)
```bash
cd packages/backend
yarn dev  # Inicia com nodemon
```

## Acessar Projeto
- Mobile: Emulador ou dispositivo via Metro (http://localhost:8081)
- Web: http://localhost:3000
- Backend: http://localhost:5000/api/health

## Verificar Logs
```bash
tail -f packages/backend/logs/app.log
``` 