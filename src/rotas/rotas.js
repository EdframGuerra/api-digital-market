const express = require('express');
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/controladorUsuario');
const { login } = require('../controladores/login');
const validarLogin = require('../intermediarios/validarLogin');
const { listarProdutos, detalharProduto, cadastrarProduto, atualizarProduto, excluirProduto } = require('../controladores/controladorProdutos');

const rotas = express.Router()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(validarLogin)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', atualizarUsuario)
rotas.get('/produtos', listarProdutos)
rotas.get('/produtos/:id', detalharProduto)
rotas.post('/produtos', cadastrarProduto)
rotas.put('/produtos/:id', atualizarProduto)
rotas.delete('/produtos/:id', excluirProduto)

module.exports = rotas;