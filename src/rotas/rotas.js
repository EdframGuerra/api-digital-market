const express = require('express');
const { cadastrarUsuario } = require('../controladores/controladorUsuario');
const { login } = require('../controladores/login');
const validarLogin = require('../intermediarios/validarLogin');

const rotas = express.Router()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(validarLogin)


module.exports = rotas;