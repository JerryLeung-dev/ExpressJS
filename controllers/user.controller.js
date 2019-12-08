//exported module can be an object or function
var db = require('../db');
var shortid = require('shortid');
var cookieParser = require('cookie-parser');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })



module.exports.index = function(req,res){
	res.render('users/index', {
		users:db.get('users').value() //value is a function here.
	});
};

module.exports.search = function(req,res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	});
	res.render("users/index",{
		users: matchedUsers
	});
};

module.exports.create = function(req,res){
	console.log(req.cookies);
	res.render("users/create");
};

module.exports.postCreate = function(req,res){//postCreate to diffentiate it with create
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split(['\\']).join('/');
	// console.log(res.locals);
	db.get('users').push(req.body).write();
	res.redirect("/users");
};

module.exports.get = function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({id :id}).value();
	res.render("users/view",{
		user:user
	});
};

