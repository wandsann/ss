FROM node:20-alpine

WORKDIR /app

# Instalar dependências
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar código
COPY . .

# Construir aplicação
RUN yarn build

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["yarn", "start"] 