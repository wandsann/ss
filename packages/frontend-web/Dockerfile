FROM node:20

WORKDIR /app

# Instalar dependências
COPY package.json yarn.lock ./
RUN yarn install

# Copiar código
COPY . .

# Construir aplicação
RUN yarn build

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["yarn", "start"] 