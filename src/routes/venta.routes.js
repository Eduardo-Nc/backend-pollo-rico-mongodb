const { Router } = require('express');
const { createVenta, getVenta, getVentaCantidadSuc, getVentaCantidadSucRoot, deactivateVenta, updatedVenta } = require('../controllers/venta');

const router = Router();



router.get('/', getVenta);

router.get('/total/suc/cantidad/:i/:f/:id_suc', getVentaCantidadSuc);

router.get('/total/cantidad/root/:i/:f', getVentaCantidadSucRoot);

router.post('/new', createVenta);

router.put('/delete/:id', deactivateVenta);

router.put('/:id', updatedVenta);


module.exports = router;