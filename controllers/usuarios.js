const { response } = require('express');

const usuariosGet = (req, res) => {

    const { nombre, id } = req.query

    res.json({
        "ok": "true",
        "msg": "get API - Controlador",
        nombre,
        id
    })
}

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        "msg": "Post API - Controlador",
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;
    res.json({
        "ok": "true",
        "msg": "Put API - Controlador",
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        "ok": "true",
        "msg": "Patch API - Controlador"
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        "ok": "true",
        "msg": "Delete API - Controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}