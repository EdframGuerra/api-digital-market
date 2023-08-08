const express = require('express');
const { cadastrarUsuario } = require('../controladores/controladorUsuario');

const rotas = express.Router()

rotas.post('/usuario', cadastrarUsuario)


module.exports = rotas;