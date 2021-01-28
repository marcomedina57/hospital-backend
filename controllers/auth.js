const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB)
        return res.status(404).json({ok: false, msg: 'Error 4040'})

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword)
            return res.status(400).json({ok: false, msg: 'Contraseña mala'})

        //si se llega hasta este punto se genera Token

        const JWT = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            JWT
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}