const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req , res = response) => {

    res.json({
        message: 'get API - controlador'
    })
}
const usuariosPost = async(req, res = response) => {

    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario( {nombre,correo,password,rol} );

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    //guardar en BD

    await usuario.save();

    res.json({
        usuario
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controlador'
    })
}
const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    const  usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        message: 'put API - controlador',
        usuario
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