var express = require('express');
var router = express.Router();

const authCtrl = require('../controllers/auth.controller');
const productCtrl = require('../controllers/product.controller');
const verifyCtrl = require('../controllers/verify.controller');

/* GET users listing. */
router.get('/users', verifyCtrl.verifyToken, authCtrl.getUsers);

/* GET products listing. */
router.get('/products', verifyCtrl.verifyToken, productCtrl.getProducts);

module.exports = router;
