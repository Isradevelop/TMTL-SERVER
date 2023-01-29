/*
    Event Routes
    /api/clients
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getClients, createClient, updateClient, deleteClient, getClientById } = require('../controllers/clients');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener clientes
router.get('/', getClients );

// Obtener clientes
router.get('/:id', getClientById );

// Crear un nuevo cliente
router.post(
    '/',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('surname','Los apellidos son obligatorios').not().isEmpty(),
        check('address','La direccion es obligatoria').not().isEmpty(),
        check('zone','La zona es obligatoria').not().isEmpty(),
        check('telephone','El telefono es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('isActive','Es necesario indicar si está activado').not().isEmpty(),
        check('vip','Es necesario indicar si es VIP').not().isEmpty(),
        check('initial_weight','El peso inicial es obligatorio').not().isEmpty(),
        check('objetive_weight','El peso objetivo es obligatorio').not().isEmpty(),
        check('date_of_bird','Fecha de nacimiento es obligatoria').custom( isDate ),
        validarCampos
    ],
    createClient 
);

// Actualizar cliente
router.put(
    '/:id', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('surname','Los apellidos son obligatorios').not().isEmpty(),
        check('address','La direccion es obligatoria').not().isEmpty(),
        check('zone','La zona es obligatoria').not().isEmpty(),
        check('telephone','El telefono es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('isActive','Es necesario indicar si está activado').not().isEmpty(),
        check('vip','Es necesario indicar si es VIP').not().isEmpty(),
        check('initial_weight','El peso inicial es obligatorio').not().isEmpty(),
        check('objetive_weight','El peso objetivo es obligatorio').not().isEmpty(),
        check('date_of_bird','Fecha de nacimiento es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateClient 
);

// Borrar cliente
router.delete('/:id', deleteClient );

module.exports = router;