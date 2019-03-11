# Desafio NodeJS

## Dependências

- node v8 (recomendo instalar [via](https://github.com/creationix/nvm))
  - [yarn](https://yarnpkg.com)

## Instalar dependências e iniciar servidor

```bash
yarn # instalar dependências
yarn start # iniciar servidor
```

## Instruções

Faça um fork do repositório e abra um pull request com seu desafio.

## Objetivos do desafio

Você é livre pra instalar quaiquer libs que quiser.

1. Modifique o arquivo routes/fat.js pra que o comando abaixo retorne o fatorial de um número qualquer `n`
```bash
curl -X POST http://localhost:7777/calcs/fat -H 'Content-Type: application/json' -d '{"n": 1}'

```
2. Implemente a rota que responde com o valor fibonacci de um número. Como a chamada abaixo
```bash
curl -X POST http://localhost:7777/calcs/fib -H 'Content-Type: application/json' -d '{"n": 1}'

```
3. Faça log da URL de todas as requisições que chegam ao servidor automaticamente
4. Implemente rotas de CRUD de uma entidade livro, com os atributos `{id, nome}`. A persistência pode ser em memória, mas usar MongoDB, é um bônus.
5. Atualize a seção [resultados](#resultados) com instruções de como testar o passo 4
6. Bônus: use docker

## Resultados

### Iniciar o servidor e configurar o Banco de Dados

Há dois modos de execução, um local e um usando um _Database-as-a-Service_. Abaixo seguem as instruções para usá-las com ou sem o [Docker](https://docs.docker.com) e [Docker compose](https://docs.docker.com/compose) <small>(opcionalmente)</small>.

#### Sem Docker
Após instalar as dependências com `yarn`, siga um dos métodos abaixo

* Executar `yarn develop` para usar uma instância local do [MongoDB](https://www.mongodb.com/download-center)
  1. Altere o arquivo `.env.dev` para definir as variáveis do BD de acordo com as configurações da sua instância
* Executar `yarn start` para usar o banco de dados que está hospeado no [mLab](https://mlab.com) (levemente populado)
  1. `cp .env.dev .env` para criar o arquivo `.env` baseado no `.env.dev`
  2. No arquivo `.env` atualize as variáveis:
      + **`DB_PORT=55665`**
      + **`DB_HOST=ds155665.mlab.com`**
      + **`DB_USERNAME=madmin`**
      + **`DB_PASSWORD=madmin67`**

#### Com Docker
Não precisa baixar o meu repositório do GitHub, pois disponibilizei uma imagem com meu código: [`micalevisk/desafio-anye`](https://hub.docker.com/r/micalevisk/desafio-anyee). Mas, caso queira alterar o código, após baixá-lo, execute os comandos abaixo na raiz do projeto -- onde está o arquivo `docker-compose.yml`:

```bash
# após instalar as dependências
docker-compose up --detach # criar e executar os services `db` e `web`
docker-compose logs -f web # para monitorar os logs do server e a saída do Nodemon
```


Para testar usando uma instância local do `mongodb`, não é preciso iniciar um container com o driver do MongoDB, contudo, assume-se que essa instância está ouvindo a porta **27017**. Caso contrário, será preciso adicionar `-e DB_PORT=<sua_porta>` no comando `[2]` da sequência abaixo ou editar o arquivo `.env` que estará no _container_ após a execução do comando `[3]` <small>(ou do _docker-compose_ acima)</small>

Basta executar o que segue:
```bash
# [1] (opcional) iniciar container com MongoDB
mkdir ~/micalevisk_dbdata # os dados do BD serão persistidos neste dir.

docker run --name dbmicalevisk -d -p 27017:27017 -v ~/micalevisk_dbdata:/data/db mongo

# (opcional) consultar o banco manualmente acessando o shell do container
docker exec -it dbmicalevisk /bin/sh
## *************** NO SHELL DO CONTAINER
$ mongo --host localhost:27017
> use micael-anyee
> db.livros.find()
## *************************************


# [2] iniciar container para a app
docker run --name servermicalevisk -p 7777:7777 --network="host" -it micalevisk/desafio-anyee
## *************** NO SHELL DO CONTAINER
# [3] criar arquivo `.env` para configurar o ambiente de production
echo -e "DB_PORT=55665\nDB_HOST=ds155665.mlab.com\nDB_NAME=micael-anyee\nDB_USERNAME=madmin\nDB_PASSWORD=madmin67" > .env

yarn start # iniciar o servidor usando o BD remoto (não requer a execução do passo 1)
## ou
yarn develop # iniciar o servidor usando o BD local (requer a execução do passo 1)
## *************************************

# (opcional) para acessar o shell do container em outro terminal
docker exec -it servermicalevisk /bin/sh

## ------- caso queira usar/alterar Dockerfile do meu repo ------- ##

# gerar a imagem
docker build -t micalevisk/desafio-anyee .

# atualizar no Docker Hub
docker push micalevisk/desafio-anyee
```

### Descrição da API

| endpoint | descrição |
|:---------|:----------|
**GET** `/api/livros` | Retorna um JSON com todos os livros cadastrados.
**GET** `/api/livros/{id}` | Retorna um JSON que representa o livro com o id solicitado.
**POST** `/api/livros` | Dado um número `id` e uma string `nome` no _body_ da requisição, cadastra um novo livro no BD e retorna um JSON indicando sucesso.
**PUT** `/api/livros/{id}?return_new={false,true}` | Dado um número `id` e/ou uma string `nome` no _body_ da requisição, atualiza o livro identificado por `id` (da URL) e retorna o JSON que o representa. A query string `return_new` é `false` por padrão. Se `true`, o livro atualizado será retornado.
**DELETE** `/api/livros/{id}` | Retorna um JSON com informações sobre o registro (livro) removido, dado seu `id`.

### Como consumir a API

1. usar o [Postman](#postman) ou o [Insomnia](#insomnia)
    > Importar um ambiente configurado com os testes para os objetivos do desafio.
3. usar o [cURL](#curl)

#### <a name="postman"></a> Usando o REST Client [Postman](https://www.getpostman.com/downloads/)

1. Import a _collection_ com a URL abaixo
    > vá em `Import` e selecione `Import From Link`
    * https://www.getpostman.com/collections/bf121d24e8a8ecea119f


#### <a name="insomnia"></a> Usando o REST Client [Insomnia](https://insomnia.rest/download)

1. Importe o _workspace_ com a URL abaixo:
    > vá em `workspace` > `Import/Export` > `Import Data` > `From URL`
    - https://gist.githubusercontent.com/micalevisk/5d7b51ad4adae64ae405fb893a1f64dd/raw/eb6ddcd1e14cf521a3733caef13dacf3672aa241/Micael-Anyee_2019-03-10.json

#### <a name="curl"></a> Usando o cURL
Basta seguir a sequência de comandos abaixo _<small>(top-down)</small>_

```bash
## [C]RUD ~ cadastrar um livro
curl -X POST 'http://localhost:7777/api/livros' -H 'content-type: application/json' -d '{"id": 123,"nome": "Foobar"}'

## C[R]UD ~ listar todos os livros cadastrados
curl -X GET 'http://localhost:7777/api/livros'

## C[R]UD ~ recuperar o livro de `id` 123
curl -X GET 'http://localhost:7777/api/livros/123'

## CR[U]D ~ atualizar o nome livro que tem o `id` 123, retornando o novo registro
curl -X PUT 'http://localhost:7777/api/livros/123?return_new=true' -H 'content-type: application/json' -d '{"nome": "bar" }'

## CRU[D] ~ remover o livro que tem o `id` 123
curl -X DELETE 'http://localhost:7777/api/livros/123'
```
