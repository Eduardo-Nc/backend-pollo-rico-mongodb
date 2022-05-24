const { Router } = require('express');
const { createVenta, getVenta, deactivateVenta, updatedVenta } = require('../controllers/venta');

const router = Router();


router.get('/', getVenta);

router.post('/new', createVenta);

router.put('/delete/:id', deactivateVenta);

router.put('/:id', updatedVenta);


module.exports = router;