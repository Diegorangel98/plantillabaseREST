const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido,existeCorreo,existeUsuarioPorId } = require('../helpers/db-validators');

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
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(( existeUsuarioPorId )),
    check('rol').custom(( esRoleValido )),
    validarCampos
], usuariosPut);
router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(( existeUsuarioPorId )),
    validarCampos
], usuariosDelete);









module.exports = router;