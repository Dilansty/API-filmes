/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD de nacionalidades
 * Data: 08/05/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do nacionalidade no banco de dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

//Função para inserir dados na tabela de nacionalidade
const inserirNovaNacionalidade = async function (nacionalidade, contentType) {


    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //console.log(nacionalidade)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Validação de dados para os atributos do nacionalidade(Status 400)
            let validar = await validarDados(nacionalidade)

            //SSe a função validar retornar um JSON de erro, iremos devolver ao APP o erro
            if (validar) {
                return validar
            } else {
                //Encaminha os dados do nacionalidade para o DAO
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                console.log(result)

                if (result) { //201
                    //Criando o atributo ID no JSON do nacionalidade e colocando o ID gerado após o insert
                    nacionalidade.id = result
                    
                    message.DEFAULT_MESSAGE.status       = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code  = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message      = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response     = nacionalidade

                    return message.DEFAULT_MESSAGE//200 (atualizado)

                } else { //500
                    // console.log(2)
                    return message.ERROR_INTERNAL_SERVER_MODEL //500(model)
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE//415
        }

    } catch (error) {
        console.log('deu ruins '+error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

//Função para atualizar um nacionalidade existente na tabela
const atualizarNacionalidade = async function (nacionalidade,id,contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
            
    try {
        //Validação do content type para receber o JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarNacionalidade(id)
            //Se a função buscar encontrar o nacionalidade o atributo status do JSON será verdadeiro
            //Isso significa que o nacionalidade existe na base, caso não retorne true, então p retorno da função
            //poderá ser um 400 ou 404 ou até mesmo um 500
            if(resultBuscarID.status){           
                let validar = await validarDados(nacionalidade)
                //validação de campos obrigatorios para a atualização(body)
                if(!validar){
                    //adiciono o atributo ID do nacionalidade no JSON para ser enviado ao DAO
                    nacionalidade.id = id

                    //chama a função do DAO para atualizar o nacionalidade(dados e o ID)
                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = nacionalidade

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

//Função para retornar todos os dados da tabela de nacionalidade
const selecionarNacionalidade = async function () {
}

//Função para retornar todos os nacionalidades
const listarNacionalidade = async function () {
    let message = JSON.parse(JSON.stringify(config_message))
        
    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os nacionalidades
                message.DEFAULT_MESSAGE.status            = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.nacionalidade    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do nacionalidade
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

//Função para retornar os dados do nacionalidade filtrando pelo ID
const buscarNacionalidade = async function (id) {
     //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
     let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          =    message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     =    message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.nacionalidade  =    result

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

//Função para excluir um nacionalidade pelo ID
const excluirNacionalidade = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarNacionalidade(id)

        //Validação para verificar se o status é verdadeiro(se existe o ID)
        if(resultBuscarID.status){
            //Chamar a função do DAO para excluir o nacionalidade
            let result = await nacionalidadeDAO.deleteNacionalidade(id)
            
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

//Funcção para validar todos os dados de nacionalidade(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (nacionalidade) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do nacionalidade (status 400)
    if (nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 200) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400
    } else {
                return false
        
    }

}

module.exports = {
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    selecionarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}