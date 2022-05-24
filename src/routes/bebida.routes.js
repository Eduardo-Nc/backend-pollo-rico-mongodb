const { Router } = require('express');
const { createBebida, getBebida, deactivateBebida, updatedBebida } = require('../controllers/bebida');

const router = Router();


router.get('/', getBebida);

router.post('/new', createBebida);

router.put('/delete/:id', deactivateBebida);

router.put('/:id', updatedBebida);


module.exports = router;