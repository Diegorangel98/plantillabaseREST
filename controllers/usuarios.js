const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req , res = response) => {
    
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({
        message: 'get API - controlador',
        total,
        usuarios
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
    const {_id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    const  usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    // borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    // borrar logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}