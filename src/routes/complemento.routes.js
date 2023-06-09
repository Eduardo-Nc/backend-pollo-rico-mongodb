const { Router } = require('express');
const { createComplemento, getComplemento, getComplementoCantidadSuc, getComplementoCantidadRoot, deactivateComplemento, updatedComplemento, complementoCantidadSuc, complementoCantidadRoot } = require('../controllers/complemento');

const router = Router();


router.get('/', getComplemento);

router.post('/new', createComplemento);

router.get('/total/suc/cantidad/:id_suc', getComplementoCantidadSuc);

router.get('/total/cantidad/root', getComplementoCantidadRoot);

router.put('/delete/:id', deactivateComplemento);

router.put('/:id', updatedComplemento);


// 
router.get('/suc/cantidad/:id_suc', complementoCantidadSuc);

router.get('/cantidad/root', complementoCantidadRoot);

module.exports = router;

