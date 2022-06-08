const { response } = require("express");

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            ok: false,
            msg: 'Se intenta verificar el rol de un usuario sin autenticar el token'
        });
    }
    
    const {rol, nombre } = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no tiene el rol de administrador`
        });
    }
    next();
}
const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                ok: false,
                msg: 'Se intenta verificar el rol de un usuario sin autenticar el token'
            });
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                ok: false,
                msg: `El usuario requiere alguno de esros roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}