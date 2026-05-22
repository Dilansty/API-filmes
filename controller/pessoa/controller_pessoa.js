/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD de pessoas
 * Data: 08/05/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do pessoa no banco de dados
const pessoaDAO = require('../../model/DAO/pessoa/pessoa.js')

//Função para inserir dados na tabela de pessoa
const inserirNovaPessoa = async function (pessoa, contentType) {


    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //console.log(pessoa)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Validação de dados para os atributos do pessoa(Status 400)
            let validar = await validarDados(pessoa)

            //SSe a função validar retornar um JSON de erro, iremos devolver ao APP o erro
            if (validar) {
                return validar
            } else {
                //Encaminha os dados do pessoa para o DAO
                let result = await pessoaDAO.insertPessoa(pessoa)

                console.log(result)

                if (result) { //201
                    //Criando o atributo ID no JSON do pessoa e colocando o ID gerado após o insert
                    pessoa.id = result
                    
                    message.DEFAULT_MESSAGE.status       = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code  = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message      = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response     = pessoa

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

//Função para atualizar um pessoa existente na tabela
const atualizarPessoa = async function (pessoa,id,contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
            
    try {
        //Validação do content type para receber o JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarPessoa(id)
            //Se a função buscar encontrar o pessoa o atributo status do JSON será verdadeiro
            //Isso significa que o pessoa existe na base, caso não retorne true, então p retorno da função
            //poderá ser um 400 ou 404 ou até mesmo um 500
            if(resultBuscarID.status){           
                let validar = await validarDados(pessoa)
                //validação de campos obrigatorios para a atualização(body)
                if(!validar){
                    //adiciono o atributo ID do pessoa no JSON para ser enviado ao DAO
                    pessoa.id = id

                    //chama a função do DAO para atualizar o pessoa(dados e o ID)
                    let result = await pessoaDAO.updatePessoa(pessoa)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response = pessoa

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

//Função para retornar todos os dados da tabela de pessoa
const selecionarPessoa = async function () {
}

//Função para retornar todos os pessoas
const listarPessoa = async function () {
    let message = JSON.parse(JSON.stringify(config_message))
        
    try {
        let result = await pessoaDAO.selectAllPessoa()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os pessoas
                message.DEFAULT_MESSAGE.status            = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.pessoa    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do pessoa
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

//Função para retornar os dados do pessoa filtrando pelo ID
const buscarPessoa = async function (id) {
     //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
     let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await pessoaDAO.selectByIdPessoa(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          =    message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     =    message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.pessoa  =    result

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

//Função para excluir um pessoa pelo ID
const excluirPessoa = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarPessoa(id)

        //Validação para verificar se o status é verdadeiro(se existe o ID)
        if(resultBuscarID.status){
            //Chamar a função do DAO para excluir o pessoa
            let result = await pessoaDAO.deletePessoa(id)
            
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

//Funcção para validar todos os dados de pessoa(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (pessoa) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do pessoa (status 400)
    if (pessoa.nome == undefined || pessoa.nome == '' || pessoa.nome == null || pessoa.nome.length > 200) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (pessoa.data_nascimento == undefined || pessoa.data_nascimento == '' || pessoa.data_nascimento == null || pessoa.data_nascimento.length != 10) {
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

<<<<<<< HEAD
    } else if (pessoa.duracao == undefined || pessoa.duracao == '' || pessoa.duracao == null || pessoa.duracao.length < 5) {
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (pessoa.sinopse == undefined || pessoa.sinopse == '' || pessoa.sinopse == null) {
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (isNaN(pessoa.avaliacao) || pessoa.avaliacao.length > 3) {
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (pessoa.valor == undefined || pessoa.valor == '' || pessoa.valor == null || pessoa.valor.split('.')[0].length > 3 || isNaN(pessoa.valor)) {
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (pessoa.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
=======
    } else if (pessoa.pais_nascimento == undefined || pessoa.pais_nascimento == '' || pessoa.pais_nascimento == null ) {
        message.ERROR_BAD_REQUEST.field = '[PAIS] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (pessoa.foto > 255) {
        message.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
>>>>>>> cebd21a0c44f01655f172aff4075626057b76233
        return config_message.ERROR_BAD_REQUEST //400

    } else {
        return false
    }

}

module.exports = {
    inserirNovaPessoa,
    atualizarPessoa,
    selecionarPessoa,
    listarPessoa,
    buscarPessoa,
    excluirPessoa
}