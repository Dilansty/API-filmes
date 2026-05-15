/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela nacionalidade
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

//Função para inserir dados na tabela de nacionalidade
const updateNacionalidade = async function (nacionalidade) {
    try {
         let sql = `  
        update tbl_nacionalidade set
        nacionalidade                = '${nacionalidade.nacionalidade}'
        where id = ${nacionalidade.id};`

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

//Função para atualizar um nacionalidade existente na tabela
const insertNacionalidade = async function (nacionalidade) {
    try {
        let sql = `insert into tbl_nacionalidade(
            nacionalidade
        )
    values(
            '${nacionalidade.nacionalidade}'); `



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

//Função para retornar todos os dados da tabela de nacionalidade
const selectAllNacionalidade = async function () {
    try {
        //script select pra ver todos os nacionalidades
        let sql = `select * from tbl_nacionalidade order by id desc`

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

//Função para retornar os dados do nacionalidade filtrando pelo ID
const selectByIdNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`

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

//Função para excluir um nacionalidade pelo ID
const deleteNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id} ;`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade

}