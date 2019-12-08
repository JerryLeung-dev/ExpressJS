var db = require('../db');

module.exports.requireAuth = function(req,res,next){
	//force users to login route
	console.log(req.cookies, req.signedCookies)
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	//check if the cookies match with the id in db
	var user = db.get('users').find({id:req.signedCookies.userId}).value();
	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
};