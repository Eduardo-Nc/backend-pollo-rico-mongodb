const { Router } = require('express');
const { createTicket, createReporte, getReporte, getTicket } = require('../controllers/reporte');

const router = Router();


router.get('/', getReporte);

router.post('/create-pdf/:folio/:sucursal/:numero/:direccion/:efectivo/:cambio', createTicket);

router.post('/new/:nomu/:noms/:direc/:tel/:dif/:toefec/:inicaja', createReporte);

router.get('/fetch-pdf-ticket', getTicket);


module.exports = router;