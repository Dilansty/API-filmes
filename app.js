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
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerCargo = require('./controller/cargo/controller_cargo.js')
const controllerPessoa = require('./controller/pessoa/controller_pessoa.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')


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





/************************************************************************************

ENDPOINT FILMES

***************************************************************************************/


//APP DO FILME
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

//Endpoint para Atualizar um Filme pelo ID
app.put("/v1/senai/locadora/filme/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um Filme pelo ID
app.delete("/v1/senai/locadora/filme/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})









/************************************************************************************

ENDPOINT GENERO

***************************************************************************************/
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)
})



app.get("/v1/senai/locadora/genero", async function(request,response){
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
     
})


app.get("/v1/senai/locadora/genero/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Atualizar um genero pelo ID
app.put("/v1/senai/locadora/genero/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um genero pelo ID
app.delete("/v1/senai/locadora/genero/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})











/************************************************************************************

ENDPOINT NACIONALIDADE

***************************************************************************************/


app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)
})



app.get("/v1/senai/locadora/nacionalidade", async function(request,response){
    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
     
})


app.get("/v1/senai/locadora/nacionalidade/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Atualizar um nacionalidade pelo ID
app.put("/v1/senai/locadora/nacionalidade/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um nacionalidade pelo ID
app.delete("/v1/senai/locadora/nacionalidade/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})









/************************************************************************************

ENDPOINT PESSOA

***************************************************************************************/


app.post('/v1/senai/locadora/pessoa', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerPessoa.inserirNovaPessoa(dados, contentType                )
    console.log(result)
    response.status(result.status_code)
    response.json(result)
})



app.get("/v1/senai/locadora/pessoa", async function(request,response){
    let result = await controllerPessoa.listarPessoa()

    response.status(result.status_code)
    response.json(result)
     
})


app.get("/v1/senai/locadora/pessoa/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerPessoa.buscarPessoa(id)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Atualizar um pessoa pelo ID
app.put("/v1/senai/locadora/pessoa/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerPessoa.atualizarPessoa(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um pessoa pelo ID
app.delete("/v1/senai/locadora/pessoa/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerPessoa.excluirPessoa(id)

    response.status(result.status_code)
    response.json(result)
})









/************************************************************************************

ENDPOINT CARGO

***************************************************************************************/


app.post('/v1/senai/locadora/cargo', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerCargo.inserirNovoCargo(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)
})



app.get("/v1/senai/locadora/cargo", async function(request,response){
    let result = await controllerCargo.listarCargo()

    response.status(result.status_code)
    response.json(result)
     
})


app.get("/v1/senai/locadora/cargo/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerCargo.buscarCargo(id)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Atualizar um cargo pelo ID
app.put("/v1/senai/locadora/cargo/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerCargo.atualizarCargo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um cargo pelo ID
app.delete("/v1/senai/locadora/cargo/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerCargo.excluirCargo(id)

    response.status(result.status_code)
    response.json(result)
})












/************************************************************************************

ENDPOINT CLASSIFICACAO

***************************************************************************************/


app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)
})



app.get("/v1/senai/locadora/classificacao", async function(request,response){
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
     
})


app.get("/v1/senai/locadora/classificacao/:id", async function(request, response) {
    //Recebe o ID por parametro
    let id = request.params.id
    
    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Atualizar um Classificacao pelo ID
app.put("/v1/senai/locadora/classificacao/:id",bodyParserJSON, async function(request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type obedecendo a ordem
    //de criação na função da controller
    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para Deletar um Classificacao pelo ID
app.delete("/v1/senai/locadora/classificacao/:id", async function(request, response) {
    let id = request.params.id
    
    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})






//serve para inicializar a API para receber requisições
app.listen(8080, function () {
    console.log('API funcionando e aguardando novas requisições . . .')
})


