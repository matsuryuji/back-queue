## `Setup`

1. Para rodar este projeto primeiramente:

`npm install`

2. Adicionar a porta no dotenv (opcional)

3. Criar uma pasta do database

Como está sendo utilizado sqlite como banco de dados, crie uma pasta chamado `database` no root.

4. Após instalar dependência, podemos rodar o comando:

`npm run dev`

## `Erro para Windows`

Caso tenha dado algum erro sobre sqlite3, siga a instrução abaixo:

1. Rebuild modulos nativos:

`npm install`
`npm rebuild`

2. Se estiver usando versão de node diferente:

`npm rebuild sqlite3`

3. Delete e reinstala o node_modules

4. Rode o comando:

`npm run dev`
