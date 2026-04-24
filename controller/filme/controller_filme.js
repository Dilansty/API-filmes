/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD de filmes
 * Data: 17/04/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Função para inserir dados na tabela de filme
const inserirNovoFilme = async function (filme, contentType) {


    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //console.log(filme)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Validação de dados para os atributos do Filme(Status 400)
            let validar = await validarDados(filme)

            //SSe a função validar retornar um JSON de erro, iremos devolver ao APP o erro
            if (validar) {
                return validar
            } else {
                //Encaminha os dados do filme para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if (result) { //201
                    // console.log(1)
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message

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

//Função para atualizar um filme existente na tabela
const atualizarFilme = async function () {
}


//Função para retornar todos os dados da tabela de filme
const selecionarFilme = async function () {
}

//Função para retornar todos os filmes
const listarFilme = async function () {
    let message = JSON.parse(JSON.stringify(config_message))
        
    try {
        let result = await filmeDAO.selectAllFilme()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os filmes
                message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.filme    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do filme
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

//Função para retornar os dados do filme filtrando pelo ID
const buscarFilme = async function (id) {
     //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
     let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == '' || id == null || id == undefined || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await filmeDAO.selectByIdFilme(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          =    message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     =    message.SUCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.filme  =    result

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

//Função para excluir um filme pelo ID
const excluirFilme = async function () {
}

//Funcção para validar todos os dados de filme(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (filme) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do filme (status 400)
    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 200) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor)) {
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
    inserirNovoFilme,
    atualizarFilme,
    selecionarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}