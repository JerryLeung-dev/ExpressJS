var express = require('express');
var router = express.Router();

//built-in modules
var db = require('../db');
var controller = require('../controllers/auth.controller');


router.get('/login', controller.login);

router.post('/login',controller.postLogin);




module.exports = router;