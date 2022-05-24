const { Router } = require('express');
const { createDetalle, getDetalle, deactivateDetalle, updatedDetalle } = require('../controllers/detalle');

const router = Router();


router.get('/', getDetalle);

router.post('/new', createDetalle);

router.put('/delete/:id', deactivateDetalle);

router.put('/:id', updatedDetalle);


module.exports = router;