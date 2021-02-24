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

const actualizarMedico = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const medico = await Medico.findById(id);

        if (!medico)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el medico'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            msg: 'ModificarMedico',
            medicoActualizado
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
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

const borrarMedico = async(req, res) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if (!medico){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el Medico'
            });

        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })
        
    }catch(error){

        res.json({
            ok: false,
            msg: 'Error contacte al administrador'
        })
    }

}

const getMedicoById = async(req, res = response ) =>
{
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
                                        .populate('usuario', 'nombre')
                                        .populate('hospital', 'nombre');
    
        res.json({
            ok:  true,
            medico
        })

    }catch(error){
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }

}




module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico,
    getMedicoById
}