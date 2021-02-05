// api/uploads/

const { Router } = require("express");

const {check, validationResult} = require('express-validator');
const { fileUpload, retornaImagen } = require("../controllers/uploads");
const {validarCampos} = require('../middlewares/validar-campos');

const expressFileUpload = require('express-fileupload');

const {validarJWT} = require('../middlewares/validar-jwt');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',
validationResult,fileUpload);

router.get('/:tipo/:foto'
,retornaImagen);


module.exports = router