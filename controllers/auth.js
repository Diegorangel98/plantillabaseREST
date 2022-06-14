const { response } = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = (req, res = response) => {
    res.json({
        ok: true,
        message: "Login correcto"
    });
    
    // const { correo, password } = req.body;

    /* try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }
        if(!usuario.estado){
            return res.status(404).json({
                ok: false,
                msg: "El usuario no esta activo"
            });
        }
        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }
        // Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "hable con el administrador"
        });
    } */
}
const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;
try {
    const {correo, nombre, img} = await googleVerify( id_token );
    
    let usuario = await Usuario.findOne({ correo });


    if (!usuario) {
        // tengo que crearlo
        const data = {
            nombre,
            correo,
            password: '...',
            img,
            google: true
        }

        usuario = new Usuario(data);

        await usuario.save();
    }

    // si el usuario existe en DB y esta desactivado
    if (!usuario.estado) {
        return res.status(404).json({
            ok: false,
            msg: "El usuario no esta activo - hable con el administrador"
        });
    }

    // generar jwt
    const token = await generarJWT(usuario.id);

    
        res.json({
            usuario,
            token
        })
}catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Token de google no es valido"
        })
}

}

module.exports = {
    login,
    googleSignin
}