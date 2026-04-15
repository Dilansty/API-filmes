/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela filme
 * Data: 15/04/2026
 * Autor: Allan de Sousa Almeida
 * Versão: 1.0 
************************************************************************************/

//import da biblioteca para gerenciar o banco de dados MySQL no node.JS
const knex = require('knex')

//import do arquivo de configuração para conexão com o BD MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o BD MySQL
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de filme
const insertFilme = async function(filme){
}

//Função para atualizar um filme existente na tabela
const updateFilme = async function (filme) {
    let sql = `insert into tbl_filme(
                nome,
                data_lancamento,
                duracao,
                sinopse,
                avaliacao,
                valor,
                capa
            )
values (
		'${filme.nome}',
        '${filme.data_lancamento}',
        '${filme.duracao}',
        '${filme.sinopse}',
        '${filme.avaliacao}',
        '${filme.preco}',
        '${filme.capa}'
        );`
        
       //Executar o ScriptSQL no banco de dados
       let result = await knexConex.raw(sql)

    if (result)
        return true
    else
        return false
}

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function () {
    
}

//Função para retornar os dados do filme filtrando pelo ID
const selectByIdFilme = async function (id) {
    
}

//Função para excluir um filme pelo ID
const deleteFilme = async function (id) {
    
}


module.exports ={
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}