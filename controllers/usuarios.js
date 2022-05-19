const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        message: 'get API - controlador'
    })
}
const usuariosPost = (req, res = response) => {
    res.json({
        message: 'post API - controlador'
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controlador'
    })
}
const usuariosPut = (req, res = response) => {
    res.json({
        message: 'put API - controlador'
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        message: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}