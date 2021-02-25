const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
    // Leer el Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })

    }

        try {
            const {uid} = jwt.verify(token, process.env.JWT_SECRET);

            req.uid = uid;
        }
        catch(error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token incorrecto'
            })
        }
    
    next();
}

const validarADMIN_ROLE = async (req, res, next) => {
    const uid = req.uid;

    try {
        var usuarioDB;
        Usuario.findById(uid).then((resp) => {
            usuarioDB = resp;
        })
        setTimeout(() => {
            
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario no existe'
                });
            }
    
            if (usuarioDB.role !== 'ADMIN_ROLE'){
                return res.status(400).json({
                    ok: false,
                    msg: 'No tiene privilegios para hacer eso'
                })
            }
        }, 3000);
        setTimeout(() => {

            next();
        },3500);


    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;



    try {
        var usuarioDB;
        Usuario.findById(uid).then((resp) => {
            usuarioDB = resp;
        })
        setTimeout(() => {
            
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario no existe'
                });
            }
    
            if (usuarioDB.role !== 'ADMIN_ROLE' && uid !== id){
                return res.status(400).json({
                    ok: false,
                    msg: 'No tiene privilegios para hacer eso'
                })
            }
        }, 3000);
        setTimeout(() => {

            next();
        },3500);


    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}