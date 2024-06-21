FROM node:20.13.1

# Define o diretório de trabalho
WORKDIR /app

# Instala locais e configura a localidade para UTF-8
RUN apt-get update && apt-get install -y locales && \
    locale-gen en_US.UTF-8

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Copia os arquivos do projeto
COPY . .

# Instala as dependências
RUN npm install --prefix my-app

# Constrói o aplicativo
RUN npm run build --prefix my-app

# Expõe a porta (ajuste conforme necessário)
EXPOSE 3000

# Comando para executar o aplicativo
CMD ["npm", "start"]
