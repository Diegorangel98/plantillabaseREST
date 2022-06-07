const { model } = require('mongoose');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

// verificar si el rol existe
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
}

//verificar si correo existe
const existeCorreo = async(correo = '') => {
    const correoValido = await Usuario.findOne({correo});
    if(correoValido) {
        throw new Error(`El correo:  ${correo} ya existe`);
    }
}
// const existeCorreo = await Usuario.findOne({correo});
// if(existeCorreo){
//     return res.status(400).json({
//         ok: false,
//         msg: 'El correo ya existe'
//     });
// }



module.exports = {
    esRoleValido,
    existeCorreo
}

