const knex = require('../conexao/conexaoBancoDados')

const listarProdutos = async (req, res) => {
    const { id } = req.usuario
    const { categoria } = req.query



    try {

        if (!categoria) {
            const produtos = await knex('produtos').where({ usuario_id: id }).orderBy('id')
            return res.status(200).json(produtos)
        }

        if (typeof (categoria) === 'object') {
            const produtos = await knex('produtos').where({ usuario_id: id }).whereIn('categoria', categoria).orderBy('id')
            return res.status(200).json(produtos)
        }
        else {
            const produtos = await knex('produtos').where({ usuario_id: id }).where('categoria', categoria).orderBy('id')
            return res.status(200).json(produtos)
        }
    } catch (error) {       
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

const atualizarProduto = async (req, res) => {
    const { id } = req.params
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body
    const { id: idUsuario } = req.usuario

    if (!nome && !quantidade && !categoria && !preco && !descricao && !imagem) {
        return res.status(400).json({ mensagem: 'Informe ao menos um campo para atualizar' })
    }

    try {
        const produtoAtualizado = await knex('produtos').where({ id, usuario_id: idUsuario }).update({ nome, quantidade, categoria, preco, descricao, imagem })

        if (!produtoAtualizado) {
            return res.status(403).json({ mensagem: 'O produto não foi atualizado' })
        }

        return res.status(200).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}

const excluirProduto = async (req, res) => {
    const { id } = req.params
    const { id: idUsuario } = req.usuario

    try {
        const produtoExcluido = await knex('produtos').where({ id, usuario_id: idUsuario }).del()

        if (!produtoExcluido) {
            return res.status(403).json({ mensagem: 'O produto não foi excluído' })
        }

        return res.status(200).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}