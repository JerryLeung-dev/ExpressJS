var db = require('../db');
var cookie = require('cookie');

module.exports.login = function(req,res){
	res.render('auth/login');
};

module.exports.postLogin = function(req,res) {
	//process the info and navigate to the user page
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email:email}).value();

	if(!user){
		res.render('auth/login',{
			errors: [
				"User does not exist."
			],
			values: req.body

		});
		return;
	};

	if(user.password !== password) {
		res.render('auth/login', {
			errors:  [
			"Wrong password"
			]
		});
		return;
	}
	res.cookie('userId',user.id,{
		signed:true
	});

	res.redirect('/users');
};