var db = require("../db");


module.exports.countTotal = function(req,res,next){
	var sessionId = req.sessionId;
	var cart = db.get('sessions')
			.find({id: sessionId})
			.get('cart').value();

	var valuesArr = Object.values(cart);
	var sum = valuesArr.reduce(function(a,b){
		return a + b;
	}); 

	res.locals.sum =sum.toString();

	next();
}