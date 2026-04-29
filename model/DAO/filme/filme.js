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
const updateFilme = async function (filme) {
    try {

        //script para atualizar os dados do BD
        let sql = `  
        update tbl_filme set
        nome                = '${filme.nome}',
        data_lancamento     = '${filme.data_lancamento}',
        duracao             = '${filme.duracao}',
        sinopse             = '${filme.sinopse}',
        avaliacao           = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
        valor               = '${filme.valor}',
        capa                = '${filme.capa}'
        where id = ${filme.id};`

        // Executa o script SQL do BD
        let result = await knexConex.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para atualizar um filme existente na tabela
const insertFilme = async function (filme) {
    try {
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
                if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                '${filme.valor}',
                '${filme.capa}'
                );`



        //Executar o ScriptSQL no banco de dados
        let result = await knexConex.raw(sql)

        if (result)
            return true
        else { return false }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function () {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_filme order by id desc`

        // executa o script no banco
        let result = await knexConex.raw(sql)

        // verifica se o script retornou um array
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        //console.log(error)
        return false

    }
}

//Função para retornar os dados do filme filtrando pelo ID
const selectByIdFilme = async function (id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await knexConex.raw(sql)
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

//Função para excluir um filme pelo ID
const deleteFilme = async function (id) {
    try {
        let sql = `delete from tbl_filme 
                    where id = ${id} ;`



        //Executar o ScriptSQL no banco de dados
        let result = await knexConex.raw(sql)

        if (result)
            return true
        else { return false }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}




module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}