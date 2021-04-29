const { response } = require('express')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/generar-jwt');

const loginController = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar email
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos -correo'
            });
        }

        // verificar usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos -estado false'
            });
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            });
        }
        // generarel jwt
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "ok",
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}
module.exports = { loginController }