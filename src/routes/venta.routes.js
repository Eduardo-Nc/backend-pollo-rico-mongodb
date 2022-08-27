const { Router } = require('express');
const { createVenta, getVenta, getVentaxDia, getVentaSuc, getVentaAsc, ventaSucTotales, getVentaSucxDia, getVentaCantidadSuc, getTodosxDiaVentasUserAsc, getUltimaVenta, getDataReportVenta, getVentaCantidadSucRoot, deactivateVenta, updatedVenta, getTodosVentasUser, getTodosVentasUserAsc } = require('../controllers/venta');

const router = Router();



router.get('/', getVenta);

router.get('/:inicial/:final', getVentaxDia);

router.get('/asc', getVentaAsc);

router.get('/total/suc/cantidad/:i/:f/:id_suc', getVentaCantidadSuc);

router.get('/total/cantidad/root/:i/:f', getVentaCantidadSucRoot);

router.post('/new/:id_suc', createVenta);

router.put('/delete/:id', deactivateVenta);

router.put('/:id', updatedVenta);

router.get('/ultimo/:id_suc', getUltimaVenta);

router.get('/ultimo/v2/:id_suc', getUltimaVenta);

router.get('/data/report/:id_suc/:id_user/:id_corte', getDataReportVenta);

router.get('/todos/:id_user', getTodosVentasUser);

router.get('/todos/v2/:id_user', getTodosVentasUser);

router.get('/todos/asc/:id_user', getTodosVentasUserAsc);

router.get('/dia/todos/asc/:id_user/:inicial/:final', getTodosxDiaVentasUserAsc);

router.get('/suc/:id_suc', getVentaSuc);

router.get('/suc/v2/:id_suc', getVentaSuc);

router.get('/sucursal/dia/:id_suc/:inicial/:final', getVentaSucxDia);


router.get('/corte/total/:i/:f', ventaSucTotales);





module.exports = router;