const { Router } = require('express');
const { createVenta, getVenta, getVentaCantidadSuc, getUltimaVenta, getDataReportVenta, getVentaCantidadSucRoot, deactivateVenta, updatedVenta, getTodosVentasUser, getTodosVentasUserAsc } = require('../controllers/venta');

const router = Router();



router.get('/', getVenta);

router.get('/total/suc/cantidad/:i/:f/:id_suc', getVentaCantidadSuc);

router.get('/total/cantidad/root/:i/:f', getVentaCantidadSucRoot);

router.post('/new/:id_suc', createVenta);

router.put('/delete/:id', deactivateVenta);

router.put('/:id', updatedVenta);

router.get('/ultimo/:id_suc', getUltimaVenta);

router.get('/data/report/:id_suc/:id_user/:id_corte', getDataReportVenta);

router.get('/todos/:id_user', getTodosVentasUser);

router.get('/todos/asc/:id_user', getTodosVentasUserAsc);


module.exports = router;