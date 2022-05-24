const { Router } = require('express');
const { createSucursal, getSucursal, deactivateSucursal, updatedSucursal } = require('../controllers/sucursal');

const router = Router();


router.get('/', getSucursal);

router.post('/new', createSucursal);

router.put('/delete/:id', deactivateSucursal);

router.put('/:id', updatedSucursal);


module.exports = router;