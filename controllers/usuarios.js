const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.models');




const usuariosGet = async(req, res) => {

    const query = { estado: true }
    const { limite = 5, desde } = req.query

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));


    // const total = await Usuario.countDocuments(query);

    // mejorando el tiempo de procesamiento enlazando las dos func en una 
    // una promesa

    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
        Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios,
    })
}

const usuariosPost = async(req, res) => {



    // Obtenemos el body (info)
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: "Correo ya existe"
    //     })
    // }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO Validar contra BD
    if (password) {
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "ok": "true",
        "msg": "Patch API - Controlador"
    })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params

    // Cambiamos solo el estado  a false
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({

        usuario,

    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}