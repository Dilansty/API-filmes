/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela configuração ee padronização daas mensagens da API
 * Data: 17/04/2026
 * Autor: Allan de Sousa Almeida
 * Versão: 1.0
 *****************************************************************************************************************/


//Padronização de cabeçalho para retorno dos endpoint da API
const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de Filmes',
    development: 'Allan de Sousa Almeida',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {} 
}

//Mensagens de erro da API
const ERROR_BAD_REQUEST = {
    status : false,
    status_code : 400,
    message: 'Os dados enviados na requisição não estão corretos',
}

//Mensagens de sucesso da API
const SUCCESS_CREATED_ITEM = {
    status : true,
    status_code: 201,
    message: 'Registro inserido com sucesso!'
}

//exportando as variaveis de recado
module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM
}
