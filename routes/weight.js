/*
    Event Routes
    /api/clients
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getWeights,
    createWeight,
    updateWeight,
    deleteWeight,
    getWeightsByClientId
 } = require('../controllers/weight');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener pesos
router.get('/', getWeights );

// Obtener pesos
router.get('/:clientId', getWeightsByClientId );

// Crear un nuevo peso
router.post(
    '/',
    [
        check('weight','El peso es obligatorio').not().isEmpty(),
        check('client','El cliente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createWeight 
);

// Actualizar peso
router.put(
    '/:id', 
    [
        check('weight','El peso es obligatorio').not().isEmpty(),
        check('client','El cliente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateWeight 
);

// Borrar peso
router.delete('/:id', deleteWeight );

module.exports = router;