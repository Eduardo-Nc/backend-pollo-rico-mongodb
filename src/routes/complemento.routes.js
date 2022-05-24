const { Router } = require('express');
const { createComplemento, getComplemento, deactivateComplemento, updatedComplemento } = require('../controllers/complemento');

const router = Router();


router.get('/', getComplemento);

router.post('/new', createComplemento);

router.put('/delete/:id', deactivateComplemento);

router.put('/:id', updatedComplemento);


module.exports = router;