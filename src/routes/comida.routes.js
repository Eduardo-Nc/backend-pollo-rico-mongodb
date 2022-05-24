const { Router } = require('express');
const { createComida, getComida, deactivateComida, updatedComida } = require('../controllers/comida');

const router = Router();


router.get('/', getComida);

router.post('/new', createComida);

router.put('/delete/:id', deactivateComida);

router.put('/:id', updatedComida);


module.exports = router;