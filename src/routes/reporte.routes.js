const { Router } = require('express');
const { createTicket, createTicketPreliminar, createReporte, getReporte, getTicket, getTicketPreliminar, getReimprimirTicket, reimprimirTicket } = require('../controllers/reporte');

const router = Router();


router.get('/ventas', getReporte);

router.post('/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio/:nota', createTicket);

router.post('/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio', createTicket);

router.post('/create/pdf/preliminar', createTicketPreliminar);

router.post('/new/:nomu/:noms/:direc/:tel/:dif/:toefec/:inicaja', createReporte);

router.get('/fetch-pdf-ticket', getTicket);

router.get('/fetch-pdf-ticket/preliminar', getTicketPreliminar);

router.post('/reimprimir/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio/:nota/:hora_actual', reimprimirTicket);
router.post('/reimprimir/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio/:hora_actual', reimprimirTicket);
router.get('/reimprimir/fetch-pdf-ticket', getReimprimirTicket);

module.exports = router;