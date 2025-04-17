# Deploy em VPS - Saúde Conectada

## Pré-requisitos
- VPS Ubuntu 20.04 LTS ou superior
- 2 vCPUs
- 4GB RAM
- 50GB SSD
- Domínio configurado (opcional)

## Configuração Inicial

### Atualizar Sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### Instalar Dependências
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Docker
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# PM2
sudo npm install -g pm2
```

## Configurar Docker

### Criar Dockerfile para Backend
```bash
cat <<EOL > packages/backend/Dockerfile
FROM node:20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
EOL
```

### Criar Dockerfile para Frontend Web
```bash
cat <<EOL > packages/frontend-web/Dockerfile
FROM node:20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
EOL
```

### Criar docker-compose.yml
```bash
cat <<EOL > docker-compose.yml
version: '3'
services:
  backend:
    build: ./packages/backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://saude_user:Saude123!@postgres:5432/saude_conectada
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  frontend-web:
    build: ./packages/frontend-web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: saude_conectada
      POSTGRES_USER: saude_user
      POSTGRES_PASSWORD: Saude123!
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
EOL
```

## Configurar Nginx

### Criar Configuração
```bash
sudo cat <<EOL > /etc/nginx/sites-available/saude-conectada
server {
    listen 80;
    server_name seu-dominio.com;  # Substitua pelo seu domínio

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Ativar configuração
sudo ln -s /etc/nginx/sites-available/saude-conectada /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Deploy

### Clonar Repositório
```bash
git clone https://github.com/seu-usuario/saude-conectada.git
cd saude-conectada
```

### Configurar Variáveis de Ambiente
```bash
# Criar .env
cat <<EOL > .env
DATABASE_URL="postgresql://saude_user:Saude123!@postgres:5432/saude_conectada"
REDIS_URL="redis://redis:6379"
JWT_SECRET="sua-chave-secreta-256-bits"
NODE_ENV="production"
EOL
```

### Iniciar Serviços
```bash
# Construir e iniciar containers
docker-compose build
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

## Monitoramento

### Configurar PM2
```bash
# Criar arquivo de configuração
cat <<EOL > ecosystem.config.js
module.exports = {
  apps: [{
    name: 'backend',
    script: 'packages/backend/dist/index.js',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOL

# Iniciar PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Configurar SSL (opcional)
```bash
# Instalar Certbot
sudo apt install -y certbot
sudo certbot --nginx -d seu-dominio.com
```

## Backup

### Script de Backup Diário
```bash
cat <<EOL > backup.sh
#!/bin/bash
BACKUP_DIR="/backup/saude-conectada"
DATE=\$(date +%Y-%m-%d)

# Criar diretório de backup
mkdir -p \$BACKUP_DIR/\$DATE

# Backup do banco de dados
docker exec saude-conectada_postgres_1 pg_dump -U saude_user saude_conectada > \$BACKUP_DIR/\$DATE/database.sql

# Backup dos volumes
tar -czf \$BACKUP_DIR/\$DATE/volumes.tar.gz /var/lib/docker/volumes/saude-conectada_*

# Manter apenas últimos 7 dias
find \$BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
EOL

# Tornar executável
chmod +x backup.sh

# Adicionar ao crontab
(crontab -l 2>/dev/null; echo "0 0 * * * /path/to/backup.sh") | crontab -
```

## Manutenção

### Atualizar Aplicação
```bash
# Pull das últimas alterações
git pull

# Reconstruir e reiniciar containers
docker-compose build
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

### Monitorar Recursos
```bash
# Verificar uso de CPU e memória
htop

# Verificar logs
docker-compose logs -f
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Verificar Status dos Serviços
```bash
# Docker
docker ps
docker-compose ps

# Nginx
sudo systemctl status nginx

# PM2
pm2 status
```

### Verificar Logs
```bash
# Docker
docker-compose logs -f

# Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# PM2
pm2 logs
``` 