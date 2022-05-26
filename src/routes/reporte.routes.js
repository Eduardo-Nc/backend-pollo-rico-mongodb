const { Router } = require('express');
const { createTicket, createReporte, getReporte, getTicket, getReimprimirTicket, reimprimirTicket } = require('../controllers/reporte');

const router = Router();


router.get('/ventas', getReporte);

router.post('/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio/:nota', createTicket);

router.post('/new/:nomu/:noms/:direc/:tel/:dif/:toefec/:inicaja', createReporte);

router.get('/fetch-pdf-ticket', getTicket);


router.post('/reimprimir/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio/:nota', reimprimirTicket);
router.get('/reimprimir/fetch-pdf-ticket', getReimprimirTicket);

module.exports = router;