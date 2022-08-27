const { Router } = require('express');
const { createCorte, getCorte, getCorteSuc, getCorteDia, getCorteTotal, getCorteTotalSuc, deactivateCorte, updatedCorte, getUltimoCorteUser, getCorteCorreo, getCorteCorreoxdia, corteCorreo, corteCorreoRol } = require('../controllers/corte');

const router = Router();


router.get('/', getCorte);

router.get('/:id_suc', getCorteSuc);

router.get('/total/:i/:f', getCorteTotal);

router.get('/dia/:i/:f', getCorteDia);

router.get('/total/suc/total/:i/:f/:id_suc', getCorteTotalSuc);

router.post('/new', createCorte);

router.put('/delete/:id', deactivateCorte);

router.put('/:id', updatedCorte);

router.get('/ultimo_corte/user/:id_user', getUltimoCorteUser);

router.get('/email/:correo', getCorteCorreo);

router.get('/email/dia/:correo/:inicial/:final', getCorteCorreoxdia);

router.get('/:correo', corteCorreo);

router.get('/corr/:correo', corteCorreo);

router.get('/permiso/:correo', corteCorreoRol);



module.exports = router;