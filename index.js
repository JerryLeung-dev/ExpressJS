//npm install -- save multer the new middleware for the multiple-part/ form data





//After adding --inspect into the package.json
//Go to developer tools and click on the grreen hexagon
//use debugger to inespect the values passed over, can also use console tab to see the value as well





//To set env variables manually, in windows, set SESSION_SECRET=wfdgdbdb&&npm start
require('dotenv').config();
console.log(process.env.SESSION_SECRET);

//Application: set cookies and expired time to aauthorize the accessibility of a user.



//middleware has a lot of applications, one of it is to separate validation process into a separate function
//Introducing res.localsa, an object that passes parameters from one middleware to another


//var md5 = require('md5');

//Use: md5('string');


//req.params.id retrives valu after users/
//while req.query rertrieves value after ?
var express = require("express");
var bodyParser = require('body-parser'); // install this middleware to use req.body
var cookieParser = require('cookie-parser');
var app = express();
var port = 3000;

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var sessionMiddleware = require('./middlewares/session.middleware');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');
var csurf = require('csurf');


app.use(bodyParser.json());//for parsing application json
app.use(bodyParser.urlencoded({extended:true})); //for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({cookie:true}));

app.set('view engine', "pug");
app.set("views", "./views");

//Command to access static files
app.use(express.static('public'));
app.use('/users',userRoute); // /users will give the same directory to every path in the router
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', transferRoute);

app.get('/', function(req, res){
	res.render("index", {name: "CodersX"})
});

//display the diagram of middleware
app.get('/diagram', function(req,res){
	res.render('diagrams/diagram');
});

app.listen(port, function(){
	console.log("Server listening on port 3000");
});

