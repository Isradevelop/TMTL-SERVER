const { response } = require('express');
const Client = require('../models/Client');

const getClients = async( req, res = response ) => {

    const clients = await Client.find();

    res.json({
        ok: true,
        clients
    });
}
const getClientById = async( req, res = response ) => {

    const id = req.params.id;
    
    const client = await Client.findById(id);

    if ( !client ) {
        return res.status(400).json({
            ok: false,
            msg: 'El cliente no existe'
        });
    }

    res.json({
        ok: true,
        client
    });
}

const createClient = async ( req, res = response ) => {

    const { email } = req.body;
    
    try {
        let client = await Client.findOne({ email });

        if ( client ) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya existe'
            });
        }
        
        
        client = new Client( req.body );
        client.created_at = new Date();
        client.updated_at = new Date();
        const savedClient = await client.save();

        res.json({
            ok: true,
            client: savedClient
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateClient = async( req, res = response ) => {
    
    const clientId = req.params.id;

    try {

        const client = await Client.findById( clientId );

        if ( !client ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id'
            });
        }

        const newClient = {
            ...req.body
        }

        newClient.updated_at = new Date();

        const updatedClient = await Client.findByIdAndUpdate( clientId, newClient, { new: true } );

        res.json({
            ok: true,
            client: updatedClient
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteClient = async( req, res = response ) => {

    const clientId = req.params.id;

    try {

        const client = await Client.findById( clientId );

        if ( !client ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id'
            });
        }

        client.isActive = false;

        await Client.findByIdAndUpdate( clientId, client, {new: true} );

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
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getClientById
}