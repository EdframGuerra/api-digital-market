const jwt = require('jsonwebtoken')
const knex = require('../conexao/conexaoBancoDados')

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(404).json({ mensagem: 'Não autorizado' })
    }

    try {
        const token = authorization.replace('Bearer', '').trim()

        const { id } = jwt.verify(token, process.env.JWT_HASH)

        const usuario = await knex('usuarios').where({ id }).first()

        if (!usuario) {
            return res.status(404).json({mensagem:'Usuário não encontrado'})
        }

        const { senha, ...dadosUsuario } = usuario

        req.usuario = dadosUsuario

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = validarLogin