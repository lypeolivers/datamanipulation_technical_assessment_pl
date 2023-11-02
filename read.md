## Introdução

Olá!
Me chamo Luiz Fellype e desenvolvi essa aplicação para o teste técnico da vaga de Desenvolvedor Pleno na Ozmap.  
O projeto a seguir consiste no seguinte problema:

_A tarefa consiste em criar uma aplicação Backend em Typescript que realizará as seguintes ações:_
_1. Ler um arquivo XLS fornecido; 2. Salvar os dados lidos em um banco de dados MongoDB; 3. Criar diversos elementos via API em uma base OZmap com base nos dados salvos no banco._

## Instruções da APP

O arquivo `.env` deste projeto contém as seguintes variáveis (e, em seguida, eu explico a finalidade de cada uma):

    PORT= [Inserir aqui a porta que a sua aplicação irá rodar]
    APP_ENV= [Inserir aqui o tipo de ambiente que você está rodando na aplicação 'test' ou 'develop']
    DB_URL=[Inserir aqui a UrlString de conexão com o banco pelo docker mongodb://mongo:27017/mydb]
    DB_URL_CLUSTER=[Inserir aqui a UrlString de conexão com o banco pelo cluster
    URL_OZMAP_API=[Inserir aqui a Url da api Ozmap utilizada nesse projeto]
    TOKEN_API=[Inserir aqui o Token de usuário utilizado para as consultas via api Ozmap]

Por padrão, deixarei no repositório as configurações que eu uso - mas sintam-se à vontade para mudar de acordo com suas necessidades.

    .env
    PORT=3001
    APP_ENV=test
    DB_URL=mongodb://mongo:27017/mydb
    DB_URL_CLUSTER=mongodb+srv://ozmap:ozmap@cluster0.eake8v9.mongodb.net/
    URL_OZMAP_API=https://data-manipulation-6.ozmap.com.br:9994/api/v2/	TOKEN_API=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2R1bGUiOiJhcGkiLCJ1c2VyIjoiNWQ5ZjNmYjgyMDAxNDEwMDA2NDdmNzY4IiwiY3JlYXRpb25EYXRlIjoiMjAyMy0xMC0yNFQxOToxNTo0My40ODJaIiwiaWF0IjoxNjk4MTc0OTQzfQ.Mtvp0gT22S9OX71Sf17EZyW84BqIkTwxzmWAP-NomtA

## Rotas e funcionalidades

Este projeto tem como rotas principais:

    [GET]  /ozmap #Rota responsável por ler o XLS, validar os dados e salvar no banco de dados MongoDB
    [POST] /ozmap #Rota responsável por enviar para a base de dados Ozmap todos os salvos no banco de dados MongoDB anteriormente pela rota "[GET] /ozmap"

A fim de auxilio para as mesmas, temos as seguintes rotas:

    [GET] /boxes     #Rota responsável por listar todas as entidades Box criadas no banco de dados MongoDB
    [GET] /splitters #Rota responsável por listar todas as entidades Splitter criadas no banco de dados MongoDB
    [GET] /clients   #Rota responsável por listar todos as entidades Box criadas no banco de dados MongoDB
    [POST] /boxes     #Rota responsável por criar um registro de Box seguindo como entrada os campos que vem pelo XLS
    [POST] /splitters #Rota responsável por criar um registro de Splitter seguindo como entrada os campos que vem pelo XLS
    [POST] /clients   #Rota responsável por criar um registro de Client seguindo como entrada os campos que vem pelo XLS

## Testes

Criei um arquivo com poucos registros do que vem originalmente no arquivo _data.xls_ que se chama _test.xls_ . Ao preencher no arquivo `.env` a variável `APP_ENV=test`, ele fará o teste da rota `[GET] /ozmap` utilizando o arquivo `test.xls`, e, caso queira mudar para o arquivo original, é só retirar o `test` da variável `APP_ENV` .

## Observações finais

Embora eu não tenha concluído todo o projeto (deixando de realizar alguns dos requisitos adicionais devido às demandas que possuo atualmente), espero ter apresentado bem o que desenvolvi e que este teste seja capaz de demonstrar um pouco das minhas habilidades. Agradeço a oportunidade e ressalto meu interesse na vaga disponível.
Fico à disposição para um feedback.

Att,
Luiz Fellype.
