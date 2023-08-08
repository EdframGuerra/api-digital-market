const knex = require('../conexao/conexaoBancoDados')

const listarProdutos = async (req, res) => {
    const {id} = req.usuario

    try {
        const listaDeProdutos = await knex('produtos').where({usuario_id: id}).returning('*')

       if(!listaDeProdutos){
           return res.status(400).json({mensagem: 'Não foi possível listar os produtos'})

        }

        return res.status(200).json(listaDeProdutos)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
   
}

module.exports = {
    listarProdutos
}