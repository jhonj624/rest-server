const { response } = require('express')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleController = async(req,res) => {
    
    const { id_token } = req.body
    
    try {
        const {correo, nombre, img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })
        if(!usuario){
            const data = {
                nombre,
                correo,
                img,
                password: ':P',
                google: true,
                rol: 'USER_ROLE'
            }

        usuario = new Usuario(data);
        usuario.save();
        }
        
        if(!usuario.estado){
          res.status(401).json({
              msg : 'Hable con el administrador'
            })
        }
        // Generar el JWT
        const token  = await generarJWT(usuario.id);

        res.status(200).json({
            msn: "Google Signed",
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            msn:'Token de google no válido'
        })
    }
}

module.exports = { 
    loginController,
    googleController 
}