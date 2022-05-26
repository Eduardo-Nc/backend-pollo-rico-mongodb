const { Router } = require('express');
const { createTicket, getTicket } = require('../controllers/ticket');

const router = Router();

router.get('/:folio', getTicket);

router.post('/new', createTicket);

module.exports = router;