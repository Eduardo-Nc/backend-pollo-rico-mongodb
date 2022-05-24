const { Router } = require('express');
const { createBebida, getBebida, getBebidaCantidadSuc, getBebidaCantidadRoot, deactivateBebida, updatedBebida, bebidaCantidadSuc, bebidaCantidadRoot } = require('../controllers/bebida');

const router = Router();


router.get('/', getBebida);

router.get('/total/suc/cantidad/:id_suc', getBebidaCantidadSuc);

router.get('/total/cantidad/root', getBebidaCantidadRoot);

router.post('/new', createBebida);

router.put('/delete/:id', deactivateBebida);

router.put('/:id', updatedBebida);



// 

router.get('/suc/cantidad/:id_suc', bebidaCantidadSuc);

router.get('/cantidad/root', bebidaCantidadRoot);

module.exports = router;