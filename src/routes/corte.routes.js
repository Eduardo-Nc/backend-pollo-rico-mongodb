const { Router } = require('express');
const { createCorte, getCorte, getCorteTotal, getCorteTotalSuc, deactivateCorte, updatedCorte } = require('../controllers/corte');

const router = Router();


router.get('/', getCorte);

router.get('/total/:i/:f', getCorteTotal);

router.get('/total/suc/total/:i/:f/:id_suc', getCorteTotalSuc);

router.post('/new', createCorte);

router.put('/delete/:id', deactivateCorte);

router.put('/:id', updatedCorte);


module.exports = router;