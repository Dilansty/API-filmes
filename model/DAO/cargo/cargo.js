/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela cargo
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

//Função para inserir dados na tabela de cargo
const updateCargo = async function (cargo) {
    try {
         let sql = `  
        update tbl_cargo set
        cargo                = '${cargo.cargo}'
        where id = ${cargo.id};`

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

//Função para atualizar um cargo existente na tabela
const insertCargo = async function (cargo) {
    try {
        let sql = `insert into tbl_cargo(
                    cargo,
                )
            values (
                '${cargo.cargo}',
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

//Função para retornar os dados da tabela de cargo
const selectAllCargo = async function () {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_cargo order by id desc`

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

//Função para retornar os dados do cargo filtrando pelo ID
const selectByIdCargo = async function (id) {
    try {
        let sql = `select * from tbl_cargo where id=${id}`

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

//Função para excluir um cargo pelo ID
const deleteCargo = async function (id) {
    try {
        let sql = `delete from tbl_cargo where id = ${id} ;`

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
    insertCargo,
    updateCargo,
    selectAllCargo,
    selectByIdCargo,
    deleteCargo

}