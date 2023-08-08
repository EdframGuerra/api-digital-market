const knex = require('../conexao/conexaoBancoDados')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(404).json('Os campos devem ser preenchidos')
    }

    if (!email.trim() || !senha.trim()) {
        return res.status(404).json('Os campos devem ser preenchidos corretamente')
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(400).json('Usuário não encontrado')
        }

        const { senha: _, ...usuarioAutenticado } = usuario

        const senhaAutenticada = await bcrypt.compare(senha, usuario.senha)

        if (!senhaAutenticada) {
            return res.status(400).json('Usuário e/ou senha invalido(s)')
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_HASH, { expiresIn: '8h' })

        return res.status(200).json({ usuario: usuarioAutenticado, token })

    } catch (error) {
        return res.status(401).json({ mensagem: 'Acesso negado' })
    }
}

module.exports = {
    login
}