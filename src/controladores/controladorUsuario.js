const knex = require('../conexao/conexaoBancoDados')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body

    if (!nome || !email || !senha || !nome_loja) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }

    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        if (senha.length < 6) {
            return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 caracteres' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada, nome_loja })

        if (!usuarioCadastrado) {
            return res.status(400).json({ mensagem: 'O usuário não foi cadastrado' })
        }

        const { senha: _, ...usuario } = usuarioCadastrado

        return res.status(200).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


const detalharUsuario = async (req, res) => {
    return res.status(200).json(req.usuario)
}


const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario
    const { nome, email, senha, nome_loja } = req.body

    if (!nome || !email || !senha || !nome_loja) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }

    if (nome_loja.length < 5) {
        return res.status(400).json({ mensagem: 'O nome da loja deve ter no mínimo 5 caracteres' })
    }

    try {
        const emailExiste = await knex('usuarios').where({ email }).first()
        if (emailExiste && emailExiste.id !== id) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }
        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 caracteres' })
            }
        }
        const nomeLojaExiste = await knex('usuarios').where({ nome_loja }).first()
        if (nomeLojaExiste && nomeLojaExiste.id !== id) {
            return res.status(400).json({ mensagem: 'Nome da loja já cadastrado' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        if (!senhaCriptografada) {
            return res.status(400).json({ mensagem: 'Erro ao atualizar senha' })
        }

        const usuarioAtualizado = await knex('usuarios').update({ nome, email, senha: senhaCriptografada, nome_loja }).where({ id })

        if (!usuarioAtualizado) {
            return res.status(400).json({ mensagem: 'Erro ao atualizar usuário' })
        }

        return res.status(200).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}