var express = require('express');
var router = express.Router();

var controller = require('../controllers/cart.controller');
var cartMiddleware = require('../middlewares/cart.middleware');
var productController = require('../controllers/product.controller');


router.get('/add/:productId',
	controller.addToCart,
	cartMiddleware.countTotal,
	productController.index);

module.exports = router;