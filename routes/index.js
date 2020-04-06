var express = require('express');
var router = express.Router();

const productCtrl = require('../controllers/product.controller');
const verifyCtrl = require('../controllers/verify.controller');

/*************************************** HOME ************************************ */
/* GET home page. */
router.get('/:pageIndex', verifyCtrl.verifyToken, productCtrl.getFavoriteProducts);

/* POST colchon create. */
router.post('/product', verifyCtrl.verifyToken, productCtrl.createProduct);

/* GET product by id. */
router.get('/product/:id', verifyCtrl.verifyToken, productCtrl.getProduct);

/* DELETE product delete. */
router.delete('/product/:id', verifyCtrl.verifyToken, productCtrl.deleteProduct);

/* PUT product edit. */
router.put('/product/:id', verifyCtrl.verifyToken, productCtrl.editProduct);

/************************************** COLCHONES ************************************* */
/* GET colchones page. */
router.get('/colchones/:pageIndex', verifyCtrl.verifyToken, productCtrl.getColchones);

/*************************************** SOMIERES ************************************ */
/* GET somieres page. */
router.get('/somieres/:pageIndex', verifyCtrl.verifyToken, productCtrl.getSomieres);


module.exports = router;
