const { Router } = require('express');
const { createComida, getComida, getComidaCantidadSuc, getComidaCantidadRoot, comidaCantidadSuc, comidaCantidadRoot, deactivateComida, updatedComida, deleteComida } = require('../controllers/comida');

const router = Router();


router.get('/', getComida);

router.get('/total/suc/cantidad/:id_suc', getComidaCantidadSuc);

router.get('/total/cantidad/root', getComidaCantidadRoot);

router.get('/suc/cantidad/:id_suc', comidaCantidadSuc);

router.get('/cantidad/root', comidaCantidadRoot);

router.post('/new', createComida);

router.put('/delete/:id', deactivateComida);

router.put('/:id', updatedComida);

router.put('/eliminar/:id', deleteComida);


module.exports = router;