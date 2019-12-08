var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req,res){
	// var page = parseInt(req.query.page) || 1
	var page = parseInt(req.params.val) || 1 
	var next = page + 1;
	var previous = page -1;
	var perPage = 8;//number of items in a page
	var totalnumber = Math.ceil(db.get('products').value().length/perPage);
	var start = (page -1) *perPage;
	var end = (page -1) *perPage + perPage;

	//items count:sum
	var sum = res.locals.sum;

	//sending a total number of pages in an array
	var pageNumber = [];
	for(let i =1; i<=totalnumber; i++){
		pageNumber.push(i);
	};
	var shortPage = pageNumber.slice(0,3).concat(pageNumber.slice(-1));

	res.render('product/index', {
		products: db.get('products').value().slice(start,end),//value is a function here.
		pageNumber:shortPage,
		next:next,
		previous:previous,
		sum: sum
	});
};

module.exports.add = function(req,res){
	  res.render("product/add");
};

module.exports.postAdd = function(req,res){
	req.body.id= shortid.generate();
	req.body.image="https://loremflickr.com/320/240";
	db.get('products').push(req.body).write();

	res.redirect('/product');
};

module.exports.search = function(req,res){
	var p = req.query.p;
	var matchedProducts = db.get('products').value().filter(function(product){
		return product.name.toLowerCase().indexOf(p.toLowerCase())!== -1;
	});

	res.render('product/index',{
		products:matchedProducts
	});
};

