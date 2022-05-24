const { Router } = require('express');
const { createCorte, getCorte, deactivateCorte, updatedCorte } = require('../controllers/corte');

const router = Router();


router.get('/', getCorte);

router.post('/new', createCorte);

router.put('/delete/:id', deactivateCorte);

router.put('/:id', updatedCorte);


module.exports = router;