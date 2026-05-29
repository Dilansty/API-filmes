/***************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, 
 * tratamento e manipulação de dados para o CRUD da tabela filme e generos
 * Data: 22/05/2026 
 * Autor: Allan de Sousa Almeida 
 * Versão: 1.0 
 **************************************************************************************************/

//import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')


//Função para inserir dados na tabela filme_genero
async function inserirNovoFilmeGenero(filmeGenero) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let validar = await validarDados(filmeGenero)

        //se validar retornanr algo significa que é json de ero e ja sera retornado 
        if (validar) {
            return validar
        } else {
            // manda os genero para o DAO
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

            if (result) {

                filmeGenero.id = result// coloca o id ao genero apos ele ser inserido no banco 

                message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = filmeGenero

                return message.DEFAULT_MESSAGE//200 (atualizado)

            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL//erro 500

            }

        }


    } catch (error) {
        console.log('deu ruim ' + error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

}

//Função para atualizar um genero existente na tabela
const atualizarFilmeGenero = async function (filmeGenero, id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {


        let resultBuscarID = await buscarFilmeGenero(id)
        //Se a função buscar encontrar o genero o atributo status do JSON será verdadeiro
        //Isso significa que o genero existe na base, caso não retorne true, então p retorno da função
        //poderá ser um 400 ou 404 ou até mesmo um 500
        if (resultBuscarID.status) {
            let validar = await validarDados(FilmeGenero)
            //validação de campos obrigatorios para a atualização(body)
            if (!validar) {
                //adiciono o atributo ID do genero no JSON para ser enviado ao DAO
                filmeGenero.id = id

                //chama a função do DAO para atualizar o genero(dados e o ID)
                let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmeGenero

                    return message.DEFAULT_MESSAGE //200(Atualizado)

                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
            } else {
                return validar//400

            }

        } else {
            return resultBuscarID//400 ou 404 ou 500
        }

    } catch (error) {
        return config_message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//Função para retornar todos os generos
const listarFilmeGenero = async function () {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length > 0) {
                //poem o status , o codigo de status e a msg com os generos
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme_genero = result

                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do genero
            } else {
                return message.ERROR_NOT_FOUND//404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL// 500 model
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//erro 500 controller
    }
}

//Função para retornar os dados do genero filtrando pelo ID
const buscarFilmeIdGenero = async function (idGenero) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if (idGenero == undefined || idGenero == '' || idGenero == null || isNaN(idGenero)) {
            message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.filme_genero = result

                    return message.DEFAULT_MESSAGE //200
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para retornar os dados do genero filtrando pelo ID
const buscarGeneroIdFilme = async function (idFilme) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if (idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)) {
            message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.filme_genero = result

                    return message.DEFAULT_MESSAGE //200
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para retornar os dados do genero filtrando pelo ID
const buscarFilmeGenero = async function (id) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code//200
                    message.DEFAULT_MESSAGE.response.filme_genero = result

                    return message.DEFAULT_MESSAGE //200
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }
        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para excluir um genero pelo ID
const excluirFilmeGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação do erro 400 e 404
        let resultBuscarID = await buscarFilmeGenero(id)

        //Validação para verificar se o status é verdadeiro(se existe o ID)
        if (resultBuscarID.status) {
            //Chamar a função do DAO para excluir o genero
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if (result) {
                return message.SUCCESS_DELETED_ITEM // 200(Registro excluído)
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }

        } else {
            return resultBuscarID
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}


//Função para excluir os gêneros relacionados com o Filme
const excluirGenerosIdFilme = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))

    try{            
            let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

            if(result){
                return  message.SUCESS_DELETED_ITEM //200 (Registro excluido)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL//500 (model)
            }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

//Funcção para validar todos os dados de genero(obrigatórios, quantidade de caracteres, etc)
const validarDados = async function (filmeGenero) {
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do genero (status 400)
    if (filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme)) {
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else if (filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero)) {
        message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return config_message.ERROR_BAD_REQUEST //400

    } else {
        return false
    }

}

module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirGenerosIdFilme
}