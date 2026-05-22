/************************************************************************************

ENDPOINT CARGO

***************************************************************************************/


app.post('/v1/senai/locadora/cargo', bodyParserJSON, async function(request, response){
    //Recebe o conteudo dentro do body da requisição
    let dados = request.body
    //recebe o contentType da requisição para validar se é um JSON
    let contentType = request.headers['content-type']
    //console.log(request.headers)

    let result = await controllerCargo.inserirNovaCargo(dados, contentType)
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
