/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela Classificação
 * Data: 08/05/2026
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
const updateClassificacao = async function (classificacao) {
    try {
         let sql = `  
        update tbl_classificacao set
        classificacao               = '${classificacao.classificacao}',
        caracteristicas             = '${classificacao.caracteristicas}'
                where id = ${classificacao.id};`

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
const insertClassificacao = async function (classificacao) {
    try {
        let sql = `insert into tbl_classificacao(
                    classificacao,
                    caracteristicas
                )
            values (
                '${classificacao.classificacao}',
                '${classificacao.caracteristicas}'
                );`


        //Executar o ScriptSQL no banco de dados
        let result = await knexConex.raw(sql)

        if(result){
            return result[0].insertId // Retorna o ID gerado no BD
        }else{
            return false
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os dados da tabela de filme
const selectAllClassificacao = async function () {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_classificacao order by id desc`

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
const selectByIdClassificacao = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`

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
const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id = ${id} ;`

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

module.exports ={
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao

}