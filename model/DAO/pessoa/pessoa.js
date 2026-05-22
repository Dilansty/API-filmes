/***********************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQUL na tabela Pessoa
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
const updatePessoa = async function (pessoa) {
    try {

        //script para atualizar os dados do BD
        let sql = `  
        update tbl_pessoa set
        nome                = '${pessoa.nome}',
        data_nascimento     = '${pessoa.data_nascimento}',
        biografia           = '${pessoa.biografia}',
        foto                = '${pessoa.foto}'
        where id = ${pessoa.id};`

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
const insertPessoa = async function (pessoa) {
    try {
        let sql = `insert into tbl_pessoa(
                    nome,
                    data_nascimento,
                    biografia,
                    foto
                )
            values (
                '${pessoa.nome}',
                '${pessoa.data_nascimento}',
                '${pessoa.biografia}',
                '${pessoa.foto}',
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
const selectAllPessoa = async function () {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_pessoa order by id desc`

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
const selectByIdPessoa = async function (id) {
    try {
        let sql = `select * from tbl_pessoa where id=${id}`

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
const deletePessoa = async function (id) {
    try {
        let sql = `delete from tbl_pessoa where id = ${id} ;`

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
    insertPessoa,
    updatePessoa,
    selectAllPessoa,
    selectByIdPessoa,
    deletePessoa
}