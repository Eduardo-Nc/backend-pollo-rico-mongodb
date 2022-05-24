const { Router } = require('express');
const { createComida, getComida, getComidaCantidadSuc, getComidaCantidadRoot, deactivateComida, updatedComida } = require('../controllers/comida');

const router = Router();


router.get('/', getComida);

router.get('/total/suc/cantidad/:id_suc', getComidaCantidadSuc);

router.get('/total/cantidad/root', getComidaCantidadRoot);

router.post('/new', createComida);

router.put('/delete/:id', deactivateComida);

router.put('/:id', updatedComida);


module.exports = router;