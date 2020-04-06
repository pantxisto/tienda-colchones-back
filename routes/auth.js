const express = require('express');
const router = express.Router(); // Objeto que almacena las rutas

const authCtrl = require('../controllers/auth.controller');

router.post('/signin', authCtrl.postSignin);
router.post('/signremember', authCtrl.postRemember);

module.exports = router;