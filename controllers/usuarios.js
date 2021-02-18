const {response} = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const Usuario = require('../models/usuario');
const { findById, findOne } = require('../models/usuario');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios,total] = await Promise.all([
        Usuario
                            .find({}, 'nombre email role google img')
                            .skip(desde)
                            .limit( 5 ),
        Usuario.countDocuments()
    ])

     res.json({
        ok: true,
        usuarios,
        total
    });
    }

const crearUsuario = async (req, res) => {

    const {email, password, nombre} = req.body;

   

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Generar JSON Web Token
        const JWT = await generarJWT(usuario.id);



        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();


        res.json({
            ok: true,
            usuario,
            JWT
        });
        
    }
    catch(error) 
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }



}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    console.log(uid);
    try {
        
        //TODO validar token y comprobar si es el usuario correcto
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaciones
        const {password, google, email, ...campos} = req.body;


        if (usuarioDB.email !== email) {
            
        
        
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            
            } 
        }
        if (!usuarioDB.google)
        campos.email = email;
        else if (usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no puede cambiar email'
            });
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuarioActualizado
        })
        }
    
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const eliminarUsuario = async(req, res) => {
    const uid = req.params.id;

    try {
        const existeUsuario = await Usuario.findById(uid)
        if (existeUsuario)
        {
            await Usuario.findByIdAndDelete(uid);
            res.json({
                ok: true,
                uid
            });
        } 

    }
    catch(error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    

} 


    module.exports = {
        getUsuarios,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario
    }