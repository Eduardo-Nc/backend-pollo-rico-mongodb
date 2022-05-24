
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUser, getAllUsers, getUsersCantidadSuc, getUsersCantidadRoot, updateUser, usersCantidadSuc, usersCantidadRoot, createUser, loginUser, revalidateToken, updateTokenAppUser, deleteUser, enviarCredenciales } = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');
const { verifyFile } = require('../middlewares/verifyFile');



const router = Router();

router.get('/:user_id', getUser);

router.get('/', getAllUsers);

router.get('/total/suc/cantidad/:id_suc', getUsersCantidadSuc);

router.get('/total/cantidad/root', getUsersCantidadRoot);

router.get('/suc/cantidad/:id_suc', usersCantidadSuc);

router.get('/cantidad/root', usersCantidadRoot);

router.post('/new', createUser);

router.post('/login', loginUser);

router.post('/renew', validarJWT, revalidateToken);

router.put('/token/update/:user_id', updateTokenAppUser);

router.put('/delete/:user_id', deleteUser);

router.put('/update/:user_id', updateUser);

router.post('/enviarcredenciales', enviarCredenciales);


module.exports = router;