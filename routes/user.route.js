//Ctrl D to choose the same word with the word hightlighted

//exteernal modules
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
//built-in modules
var db = require('../db');
var controller = require('../controllers/user.controller');
//require validation to use it
var validation = require('../validation/user.validation');
var authMiddleware = require('../middlewares/auth.middleware');
// function middleware1(req, res, next){
// 	next();
// }

// function middleware2(req, res, next){
// 	res.send('Hello');
// }


//testing
// router.get('/test', middleware1, middleware2);

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', function(req,res,next){
	res.cookie('user-id',12345);
	res.send('Hello');
})

router.get('/search',controller.search);

router.get('/create', controller.create);

router.post('/create', 
	upload.single('avatar'),
	validation.postCreate, 
	controller.postCreate
	);


router.get('/:id', controller.get); //this one should be at the bottom because it takes whatever after it, if other commands arent loaded then will be considered as id








module.exports = router;
