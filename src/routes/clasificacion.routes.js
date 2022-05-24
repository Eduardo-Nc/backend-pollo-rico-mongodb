const { Router } = require('express');
const { createClasificacion, getClasificacion, deactivateClasificacion, updatedClasificacion } = require('../controllers/clasificacion');

const router = Router();


router.get('/', getClasificacion);

router.post('/new', createClasificacion);

router.put('/delete/:id', deactivateClasificacion);

router.put('/:id', updatedClasificacion);


module.exports = router;