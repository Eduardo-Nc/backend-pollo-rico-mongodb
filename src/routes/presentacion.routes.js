const { Router } = require('express');
const { createPresentacion, getPresentacion, deactivatePresentacion, updatedPresentacion } = require('../controllers/presentacion');

const router = Router();


router.get('/', getPresentacion);

router.post('/new', createPresentacion);

router.put('/delete/:id', deactivatePresentacion);

router.put('/:id', updatedPresentacion);


module.exports = router;