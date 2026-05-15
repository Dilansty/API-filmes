/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela genero
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

//Função para inserir dados na tabela de genero
const updateGenero = async function (genero) {
    try {
         let sql = `  
        update tbl_genero set
        genero                = '${genero.genero}'
        
        where id = ${genero.id};`

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



async function insertGenero(genero){

    try {
        //script pra onserir genero no banco de dados
        let sql = `insert into tbl_genero(
                        genero
                        )
                    values(
                        '${genero.genero}'); `
        
        //executa o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
        //console.log(result[0].insertId)
        if(result){
            return result[0].insertId// retorna o id 
        }else{return false}
    } catch (error) {
        //console.log(error)//erro 500 descomentar essa linha
        return false
    }

}

//Função para retornar todos os dados da tabela de genero
const selectAllGenero = async function () {
    try {
        //script select pra ver todos os generos
        let sql = `select * from tbl_genero order by id desc`

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

//Função para retornar os dados do genero filtrando pelo ID
const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id=${id}`

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

//Função para excluir um genero pelo ID
const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id} ;`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero

}