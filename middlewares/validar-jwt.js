const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    try {
       
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - usuario no existe'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - usuario deshabilitado'
            });
        }


        req.usuario  = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
        
    }
}


module.exports = {
    validarJWT
}
