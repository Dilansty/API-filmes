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
const inserirNovoFilme = async function(filme){

    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutra original
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos do filme (status 400)
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 200){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        
    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'
        
    }else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        
    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'

    }else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.length > 5 || isNaN(filme.valor)){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'

    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
    }
    else{
        let result = await filmeDAO.insertFilme(filme)
        if(result){ //201
            message.DEFAULT_MESSAGE.status          = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message         = message.SUCCESS_CREATED_ITEM.message
        
        }else{ //400
            message.DEFAULT_MESSAGE.status          = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code     = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message         = message.ERROR_BAD_REQUEST.message
            message.DEFAULT_MESSAGE.field           = message.ERROR_BAD_REQUEST.field
        }
    }
    return message.DEFAULT_MESSAGE
}

//Função para atualizar um filme existente na tabela
const atualizarFilme = async function () {
}


//Função para retornar todos os dados da tabela de filme
const selecionarFilme = async function () { 
}

//Função para retornar todos os filmes
const listarFilme = async function () { 
}

//Função para retornar os dados do filme filtrando pelo ID
const buscarFilme = async function () {    
}

//Função para excluir um filme pelo ID
const excluirFilme = async function () {    
}

module.exports ={
    inserirNovoFilme,
    atualizarFilme,
    selecionarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}