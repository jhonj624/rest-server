const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.models.js');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        // leer usuario corresopiente a uid

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({

                msg: 'Usuario no existe en la base de datos'
            })
        }

        // validar si existe estado:true
        if (!usuario.estado) {
            return res.status(401).json({

                msg: 'Usuario no existe en la base de datos'
            })
        }


        req.usuario = usuario;
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no válido'
        })
    }

}

module.exports = {
    validarJWT
}