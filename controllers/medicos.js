const {response } = require('express');
const hospital = require('../models/hospital');


const Medico = require('../models/medico');

const getMedicos = async(req, res = response ) =>
{

    
    const medicos = await Medico.find()
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre');

    res.json({
        ok:  true,
        medicos
    })
}

const actualizarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'ModificarMedico'
    })
}

const crearMedico = async (req, res) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
        
    }catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'Eliminar Medico'
    })
}




module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
}