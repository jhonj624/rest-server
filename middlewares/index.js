const validarRole = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');


module.exports = {
    ...validarRole,
    ...validarJWT,
    ...validarCampos,
}