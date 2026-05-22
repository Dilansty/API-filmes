/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD de classificações
 * Data: 08/05/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do classificacao no banco de dados
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

//Função para inserir dados na tabela de classificacao
const inserirNovoClassificacao = async function (classificacao, contentType) {


    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //console.log(classificacao)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Validação de dados para os atributos do classificacao(Status 400)
            let validar = await validarDados(classificacao)

            //SSe a função validar retornar um JSON de erro, iremos devolver ao APP o erro
            if (validar) {
                return validar
            } else {
                //Encaminha os dados do classificacao para o DAO
                let result = await classificacaoDAO.insertClassificacao(classificacao)

                console.log(result)

                if (result) { //201
                    //Criando o atributo ID no JSON do classificacao e colocando o ID gerado após o insert
                    classificacao.id = result
                    
                    message.DEFAULT_MESSAGE.status       = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code  = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message      = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response     = classificacao

                    return message.DEFAULT_MESSAGE//200 (atualizado)

                } else { //500
                    // console.log(2)
                    return message.ERROR_INTERNAL_SERVER_MODEL //500(model)
                }
                return message.DEFAULT_MESSAGE
            }
        } else {
            return message.ERROR_CONTENT_TYPE//415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

//Função para atualizar um classificacao existente na tabela
const atualizarClassificacao = async function (classificacao,id,contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
            
    try {
        //Validação do content type para receber o JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarClassificacao(id)
            //Se a função buscar encontrar o classificacao o atributo status do JSON será verdadeiro
            //Isso significa que o classificacao existe na base, caso não retorne true, então p retorno da função
            //poderá ser um 400 ou 404 ou até mesmo um 500
            if(resultBuscarID.status){           
                let validar = await validarDados(classificacao)
                //validação de campos obrigatorios para a atualização(body)
                if(!validar){
                    //adiciono o atributo ID do classificacao no JSON para ser enviado ao DAO
                    classificacao.id = id

                    //chama a função do DAO para atualizar o classificacao(dados e o ID)
                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = classificacao

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

//Função para retornar todos os dados da tabela de classificacao
const selecionarClassificacao = async function () {
}

//Função para retornar todos os classificacaos
const listarClassificacao = async function () {
    let message = JSON.parse(JSON.stringify(config_message))
        
    try {
        let result = await classificacaoDAO.selectAllClassificacao()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os Classificacaos
                message.DEFAULT_MESSAGE.status            = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.classificacao    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do classificacao
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

//Função para retornar os dados do classificacao filtrando pelo ID
const buscarClassificacao = async function (id) {
     //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
     let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          =    message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     =    message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.classificacao  =    result

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

//Função para excluir um classificacao pelo ID
const excluirClassificacao = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarClassificacao(id)

        //Validação para verificar se o status é verdadeiro(se existe o ID)
        if(resultBuscarID.status){
            //Chamar a função do DAO para excluir o Classificacao
            let result = await classificacaoDAO.deleteClassificacao(id)
            
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

//Funcção para validar todos os dados de classificacao(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (classificacao) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do classificacao (status 400)
    if (classificacao.classificacao == undefined || classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao.length > 200) {
        message.ERROR_BAD_REQUEST.field = '[CLASSIFICACAO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.duracao == undefined || filme.duracao == '' || filme.duracao == null || filme.duracao.length < 5) {
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null) {
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.valor == undefined || filme.valor == '' || filme.valor == null || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor)) {
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else {
        return false
    }

}

module.exports = {
    inserirNovoClassificacao,
    atualizarClassificacao,
    selecionarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}