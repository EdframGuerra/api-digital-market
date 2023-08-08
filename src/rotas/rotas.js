const express = require('express');
const { cadastrarUsuario, detalharUsuario } = require('../controladores/controladorUsuario');
const { login } = require('../controladores/login');
const validarLogin = require('../intermediarios/validarLogin');

const rotas = express.Router()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(validarLogin)
rotas.get('/usuario', detalharUsuario)

module.exports = rotas;