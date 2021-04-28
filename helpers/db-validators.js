const Role = require('../models/rol.models');
const Usuario = require('../models/usuario.models');

const rolValidate = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExistValidate = async(correo = '') => {
    // const usuario = U
    console.log(correo);
    const emailExist = await Usuario.findOne({ correo });
    console.log(emailExist);
    if (emailExist) {
        throw new Error(`Ya existe un usuario registrado con ese ${correo}`);
    }

}

const existeUsurioId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    console.log(existeUsuario);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}
module.exports = {
    rolValidate,
    emailExistValidate,
    existeUsurioId
}