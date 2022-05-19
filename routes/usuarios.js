const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPatch,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.patch('/', usuariosPatch);
router.put('/', usuariosPut);
router.delete('/', usuariosDelete);









module.exports = router;