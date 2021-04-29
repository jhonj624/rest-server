const { Router } = require('express');

const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
const {
    rolValidate,
    emailExistValidate,
    existeUsurioId
} = require('../helpers/db-validators');



const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener más de 8 caracteres').isLength({ min: 8 }),
    check('correo', 'El correo no es válido')
    .isEmail()
    .custom(emailExistValidate),

    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(rolValidate),
    validarCampos
], usuariosPost);

router.put('/:id',
    check('id', 'No es un id válido')
    .isMongoId(),
    check('id').custom(existeUsurioId),
    check('rol').custom(rolValidate),
    validarCampos, usuariosPut);
router.patch('/', usuariosPatch);

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id válido')
        .isMongoId()
        .custom(existeUsurioId),
        validarCampos
    ],
    usuariosDelete);

module.exports = router;