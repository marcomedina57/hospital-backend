// api/medicos
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
} = require('../controllers/medicos');


router.get('/', 
[
    validarJWT
],
getMedicos
);

router.put('/:id', 
[
validarJWT,
check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
validarCampos
],
actualizarMedico
);

router.post('/',
[
    validarJWT,
    check('hospital', 'El hospital ID debe ser valido').isMongoId(),
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    validarCampos
], crearMedico);

router.delete('/:id',
 [

 ], borrarMedico);


module.exports = router