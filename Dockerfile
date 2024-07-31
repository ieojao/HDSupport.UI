FROM node:20.13.1

# Define o diretório de trabalho
WORKDIR /app

# Instala locais e configura a localidade para UTF-8
RUN apt-get update && apt-get install -y locales && \
    locale-gen en_US.UTF-8

ENV PYTHONIOENCODING=UTF-8
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Copia os arquivos do projeto
COPY . .
COPY ["my-app/package.json", "package.json"]

# Instala as dependências
RUN npm install

# Constrói o aplicativo
RUN npm run build

# Expõe a porta (ajuste conforme necessário)
EXPOSE 3000

# Comando para executar o aplicativo
CMD ["npm", "start"]
