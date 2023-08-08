const knex = require('../conexao/conexaoBancoDados')

const listarProdutos = async (req, res) => {
    const { id } = req.usuario

    try {
        const listaDeProdutos = await knex('produtos').where({ usuario_id: id }).returning('*')

        if (!listaDeProdutos) {
            return res.status(400).json({ mensagem: 'Não foi possível listar os produtos' })

        }

        return res.status(200).json(listaDeProdutos)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}

const detalharProduto = async (req, res) => {
    const { id } = req.params
    const { id: idUsuario } = req.usuario

    const produto = await knex('produtos').where({ id, usuario_id: idUsuario }).first()
    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' })
    }

    return res.status(200).json(produto)

}

const cadastrarProduto = async (req, res) => {
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body
    const { id: idUsuario } = req.usuario

    if (!nome || !quantidade || !categoria || !preco || !descricao || !imagem) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }

    try {
        // implementar servidor de imagem
        const produtoCadastrado = await knex('produtos').insert({ nome, quantidade, categoria, preco, descricao, imagem, usuario_id: idUsuario }).returning('*')

        if (!produtoCadastrado) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado' })
        }

        return res.status(200).json(produtoCadastrado)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto
}