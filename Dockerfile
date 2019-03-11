FROM node:lts-alpine

# usar o diretório `/usr/app` do container como diretório de trabalho
WORKDIR /usr/app

# copiar os arquivos de dependência
COPY package*.json ./

# instalar as dependências do projeto
RUN npm install

# copiar todos os arquivos na raiz do projeto (vide .dockerignore) para o diretório de trabalho
COPY . .

# expor a porta 8080 do container
EXPOSE 7777

# CMD ["npm", "run", "develop"]
CMD ["npm", "start"]
