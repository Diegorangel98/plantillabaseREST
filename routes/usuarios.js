const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido,existeCorreo } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPatch,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo debe ser valido').isEmail(),
    check('correo').custom(( existeCorreo )),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6}),
    check('rol').custom(( esRoleValido )),
    validarCampos
] ,usuariosPost);
router.patch('/', usuariosPatch);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);









module.exports = router;