const { Router } = require('express');
const { createCargo, getCargo, deactivateCargo, updatedCargo } = require('../controllers/cargo');

const router = Router();


router.get('/', getCargo);

router.post('/new', createCargo);

router.put('/delete/:id', deactivateCargo);

router.put('/:id', updatedCargo);


module.exports = router;