const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
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
    }
}

module.exports = {
    login
}