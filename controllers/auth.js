const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google.verify');

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


const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token; 

    
    try {

        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB){
            //Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;

        }

        await usuario.save();

        //Generar JSON Web Token

        const token  = await generarJWT(usuario.id);
        res.json({
            ok: true,
            token
        })



    } catch(error) {
        res.status(401).json({
            ok: true,
            msg: 'Token incorrecto',
            googleToken 
        });
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar JSON Web Token

    const token  = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        token,
        usuario
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}