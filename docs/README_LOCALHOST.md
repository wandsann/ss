# Desenvolvimento Local - Saúde Conectada

## Pré-requisitos
- Ubuntu 20.04 LTS ou superior
- 8GB RAM
- 20GB espaço em disco
- Node.js v20.x
- Docker e Docker Compose
- PostgreSQL
- Redis

## Configuração Inicial

### Instalar Dependências
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Docker
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Redis
sudo apt install -y redis-server
sudo systemctl enable redis
sudo systemctl start redis

# Dependências globais
npm install -g yarn turbo pm2
```

## Configurar Banco de Dados

### PostgreSQL
```bash
# Criar banco de dados e usuário
sudo -u postgres psql -c "CREATE DATABASE saude_conectada;"
sudo -u postgres psql -c "CREATE USER saude_user WITH PASSWORD 'Saude123!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE saude_conectada TO saude_user;"

# Verificar conexão
psql -U saude_user -d saude_conectada -h localhost
```

### Redis
```bash
# Verificar se está rodando
redis-cli ping  # Deve retornar "PONG"
```

## Configurar Projeto

### Clonar Repositório
```bash
git clone https://github.com/seu-usuario/saude-conectada.git
cd saude-conectada
```

### Instalar Dependências
```bash
# Instalar dependências do monorepo
yarn install

# Frontend Mobile
cd packages/frontend-app
yarn install

# Frontend Web
cd ../frontend-web
yarn install

# Backend
cd ../backend
yarn install
```

### Configurar Variáveis de Ambiente
```bash
# Criar .env
cat <<EOL > .env
DATABASE_URL="postgresql://saude_user:Saude123!@localhost:5432/saude_conectada"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="sua-chave-secreta-256-bits"
NODE_ENV="development"
EOL
```

## Iniciar Desenvolvimento

### Frontend Mobile (React Native)
```bash
cd packages/frontend-app

# Iniciar Metro Bundler
yarn start

# Emulador Android
yarn android

# Ou iOS (se em macOS)
yarn ios
```

### Frontend Web (React)
```bash
cd packages/frontend-web
yarn dev
```

### Backend (Node.js)
```bash
cd packages/backend
yarn dev
```

## Acessar Projeto
- Mobile: Emulador ou dispositivo via Metro (http://localhost:8081)
- Web: http://localhost:3000
- Backend: http://localhost:5000/api/health

## Verificar Logs
```bash
# Backend
tail -f packages/backend/logs/app.log

# Frontend Web
tail -f packages/frontend-web/logs/app.log

# Frontend Mobile
# Ver logs no Metro Bundler
```

## Testes

### Frontend
```bash
# Frontend Web
cd packages/frontend-web
yarn test

# Frontend Mobile
cd packages/frontend-app
yarn test
```

### Backend
```bash
cd packages/backend
yarn test
```

## Debugging

### Frontend Web
- Chrome DevTools: http://localhost:3000
- React DevTools: Instalar extensão do Chrome

### Frontend Mobile
- React Native Debugger: yarn react-native-debugger
- Flipper: Instalar e configurar

### Backend
- Node Inspector: yarn dev:debug
- Visual Studio Code: Configurar launch.json

## Dicas de Desenvolvimento

### Hot Reload
- Frontend Web: Alterações são refletidas automaticamente
- Frontend Mobile: Shake o dispositivo para abrir menu de desenvolvimento
- Backend: Nodemon reinicia automaticamente

### Banco de Dados
```bash
# Acessar PostgreSQL
psql -U saude_user -d saude_conectada -h localhost

# Comandos úteis
\dt  # Listar tabelas
\d tabela  # Descrever tabela
\q  # Sair
```

### Redis
```bash
# Acessar Redis CLI
redis-cli

# Comandos úteis
keys *  # Listar todas as chaves
get chave  # Obter valor
del chave  # Deletar chave
```

## Troubleshooting

### Problemas Comuns

#### Banco de Dados
```bash
# Verificar status
sudo systemctl status postgresql

# Reiniciar serviço
sudo systemctl restart postgresql
```

#### Redis
```bash
# Verificar status
sudo systemctl status redis

# Reiniciar serviço
sudo systemctl restart redis
```

#### Docker
```bash
# Verificar status
sudo systemctl status docker

# Reiniciar serviço
sudo systemctl restart docker
```

#### Portas em Uso
```bash
# Listar processos usando portas
sudo lsof -i :3000  # Frontend Web
sudo lsof -i :5000  # Backend
sudo lsof -i :5432  # PostgreSQL
sudo lsof -i :6379  # Redis

# Matar processo
kill -9 PID
```

### Limpar Cache
```bash
# Frontend Web
cd packages/frontend-web
yarn clean

# Frontend Mobile
cd packages/frontend-app
yarn clean

# Backend
cd packages/backend
yarn clean
``` 