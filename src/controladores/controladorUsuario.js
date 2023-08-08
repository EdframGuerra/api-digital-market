const knex = require('../conexao/conexaoBancoDados')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body

    //validações do corpo da requisição
    if (!nome || !email || !senha || !nome_loja) {
        return res.status(404).json('Todos os campos são obrigatórios')
    }

    try {
        //email existe?
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste) {
            return res.status(400).json('Email já cadastrado')
        }

        if (senha.length < 6) {
            return res.status(400).json('A senha deve ter no mínimo 6 caracteres')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada, nome_loja }).returning('*')

        if (!usuarioCadastrado) {
            return res.status(400).json('O usuário não foi cadastrado')
        }

        const { senha: _, ...usuario } = usuarioCadastrado[0]

        return res.status(200).json(usuario)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


const detalharUsuario = async (req, res) => {
    return res.status(200).json(req.usuario)
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario
}