const { response } = require('express');
const Weigth = require('../models/Weight');

const getWeights = async( req, res = response ) => {

    const weights = await Weigth.find();

    res.json({
        ok: true,
        weights
    });
}

const getWeightsByClientId = async( req, res = response ) => {

    const {clientId} = req.params;

    const weights = await Weigth.find({client: clientId});

    res.json({
        ok: true,
        weights
    });
}

const createWeight = async ( req, res = response ) => {

    const weigth = new Weigth( req.body );

    try {

        weigth.created_at = new Date();
        weigth.updated_at = new Date();
        
        const savedWeigth = await weigth.save();

        res.json({
            ok: true,
            weigth: savedWeigth
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateWeight = async( req, res = response ) => {
    
    const weigthId = req.params.id;

    try {

        const weigth = await Weigth.findById( weigthId );

        if ( !weigth ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id'
            });
        }

        const newWeigth = {
            ...req.body
        }

        newWeigth.updated_at = new Date();

        const updatedWeigth = await Weigth.findByIdAndUpdate( weigthId, newWeigth, { new: true } );

        res.json({
            ok: true,
            weigth: updatedWeigth
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteWeight = async( req, res = response ) => {

    const weigthId = req.params.id;

    try {

        const weigth = await Client.findById( weigthId );

        if ( !weigth ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe peso por ese id'
            });
        }

        await Weigth.findByIdAndDelete( weigthId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getWeights,
    createWeight,
    updateWeight,
    deleteWeight,
    getWeightsByClientId
}