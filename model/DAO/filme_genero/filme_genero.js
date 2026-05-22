/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela FilmeGenero
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


//Função para inserir dados na tabela de FilmeGenero
const updateFilmeGenero = async function (filmeGenero) {
    try {

        // Script para atualizar os dados do BD
        let sql = `update tbl_filme_genero set
        id_filme                = '${filmeGenero.id_filme}',
        id_genero               = '${filmeGenero.id_genero}'
        where id                =  ${filmeGenero.id}`

// Executa o script SQL no BD
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

//Função para atualizar um filmeGenero existente na tabela
const insertFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero (
            id_filme,
            id_genero
            )
    values(
            '${filmeGenero.id_filme}',
            '${filmeGenero.id_genero}'
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

//Função para retornar todos os dados da tabela de filmeGenero
const selectAllFilmeGenero = async function () {
    try {
        //script select pra ver todos os filmeGeneros
        let sql = `select * from tbl_filme_genero order by id desc`

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
const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id=${id}`

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

//Função para retornar os dados de filmes filtrando pelo ID do genero
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = `select tbl_filme.* 
                         from tbl_filme
                            inner join tbl_filme_genero 
                                 on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                                 on tbl_genero.id = tbl_filme_genero.id_genero     
                    where tbl_genero.id = ${idGenero}`

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

//Função para retornar os dados dos generos  filtrando pelo ID do filme
const selectGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `select tbl_genero.* 
                         from tbl_filme
                            inner join tbl_filme_genero 
                                 on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                                 on tbl_genero.id = tbl_filme_genero.id_genero     
                    where tbl_filme.id = ${idFilme}`

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

//Função para excluir um filmeGenero pelo ID
const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id} ;`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosByIdFilme
}