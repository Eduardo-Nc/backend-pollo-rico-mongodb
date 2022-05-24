
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUser, getAllUsers, createUser, loginUser, revalidateToken, updateTokenAppUser } = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');
const { verifyFile } = require('../middlewares/verifyFile');


const router = Router();

router.get('/:user_id', getUser);

router.get('/', getAllUsers);

router.post('/new', createUser);

router.post('/login', loginUser);


router.post('/renew', validarJWT, revalidateToken);

router.put('/token/update/:user_id', updateTokenAppUser);


module.exports = router;