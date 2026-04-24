/*****************************************************************************************
 * Objetivo: Arquivo responsavel pela criação da API do projeto de Estados e Cidades
 * Data: 17/04/2026
 * Autor: Allan Almeida
 * Versão: 1.0 
 * 
 * Instalação do EXPRESS - npm install express --save
 *          Dependencia responsável pela utilização do protocolo HTTP para criar uma API
 * 
 * Instalação do CORS    - npm install cors --save
 *          Dependencia responsável pelas configurações a serem realizadas para a permissão de acesso da API
 * 
******************************************************************************************/

//import das dependencias para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Import das CONTROLLERS do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()  

//Criando um objeto para manipular o EXPRESS
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'],// a origem da requisição podendo ser um IP ou um "*" que signigica todos os elementos
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // sõa os verbos que serão liberados na API(GET, POST, PUT e DELETE),
    allowedHeaders: ['Content-Type', 'Autorizaton']//sõa permissões de cabeçalho do COrs
}

//configura as permissões da API através do CORS
app.use(cors(corsOptions))

//EndPoints para a API
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)

})

app.get("/v1/senai/locadora/filme", async function(request,response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
   
    
})

app.get("/v1/senai/locadora/filme/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

//serve para inicializar a API para receber requisições
app.listen(8080, function () {
    console.log('API funcionando e aguardando novas requisições . . .')
})