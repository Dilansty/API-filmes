/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD de generos
 * Data: 08/05/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do genero no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')


//Função para inserir dados na tabela de genero

async function inserirNovoGenero(genero,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
            let validar = await validarDados(genero)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os genero para o DAO
                let result = await generoDAO.insertGenero(genero)

                if (result) {

                    genero.id = result// coloca o id ao genero apos ele ser inserido no banco 
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = genero

                    return message.DEFAULT_MESSAGE//200 (atualizado)
                        
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//erro 500
                                       
                }
                
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    } catch (error) {
        console.log('deu ruim '+ error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//Função para atualizar um genero existente na tabela
const atualizarGenero = async function (genero,id,contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
            
    try {
        //Validação do content type para receber o JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscargenero(id)
            //Se a função buscar encontrar o genero o atributo status do JSON será verdadeiro
            //Isso significa que o genero existe na base, caso não retorne true, então p retorno da função
            //poderá ser um 400 ou 404 ou até mesmo um 500
            if(resultBuscarID.status){           
                let validar = await validarDados(genero)
                //validação de campos obrigatorios para a atualização(body)
                if(!validar){
                    //adiciono o atributo ID do genero no JSON para ser enviado ao DAO
                    genero.id = id

                    //chama a função do DAO para atualizar o genero(dados e o ID)
                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = genero

                        return message.DEFAULT_MESSAGE //200(Atualizado)

                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL//500
                    }
                }else{
                    return validar//400

                }                                

            }else{
                return resultBuscarID//400 ou 404 ou 500
            }    
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {
        return config_message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar todos os dados da tabela de genero
const selecionarGenero = async function () {
}

//Função para retornar todos os generos
const listarGenero = async function () {
    let message = JSON.parse(JSON.stringify(config_message))
        
    try {
        let result = await generoDAO.selectAllGenero()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os generos
                message.DEFAULT_MESSAGE.status            = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.genero    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do genero
            }else{
                return message.ERROR_NOT_FOUND//404
            }
            
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL// 500 model
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//erro 500 controller
    }
}

//Função para retornar os dados do genero filtrando pelo ID
const buscarGenero = async function (id) {
     //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
     let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await generoDAO.selectByIdGenero(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          =    message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     =    message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.genero  =    result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }
        }

        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para excluir um genero pelo ID
const excluirGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarGenero(id)

        //Validação para verificar se o status é verdadeiro(se existe o ID)
        if(resultBuscarID.status){
            //Chamar a função do DAO para excluir o genero
            let result = await generoDAO.deleteGenero(id)
            
            if(result){
                return message.SUCCESS_DELETED_ITEM // 200(Registro excluído)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
         
        }else{
            return resultBuscarID
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}

//Funcção para validar todos os dados de genero(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (genero) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do genero (status 400)
    if (genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 45) {
        message.ERROR_BAD_REQUEST.field = '[genero] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else {
        return false
    }

}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    selecionarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}