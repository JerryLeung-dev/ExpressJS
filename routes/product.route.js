var express = require('express');
var router = express.Router();


//built-in modules
var db = require('../db');
var controller = require('../controllers/product.controller');


router.get('/',controller.index);

router.get('/add',controller.add);

router.post('/add',controller.postAdd);

router.get('/search',controller.search);



router.get('/:val',controller.index);
module.exports = router;
