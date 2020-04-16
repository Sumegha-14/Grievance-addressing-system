var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const port=4000;
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'iwp_proj',
	dateStrings: true
});
global.connection = connection;
connection.connect(function(err) {
	if (err) return(err);
	console.log("Connected!");
  });
var app = express();
const router=express.Router();

app.use(session({ // to initialize the session
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/css'));
const {addProtection, saveProtection,getSaved,getStatus,getStatusSce,getStatusCi,getStatusHodp,addData,deletesaved} = require('./routes/UCE.js');
const {getSce,accept,getbypass,bypass,normalize,getnormalize,verify,getverify,getHod,yes,resolve} = require('./routes/others.js');
//const {getPass,byPass} = require('./routes/CI.js');
app.get('/', function(request, response) {
		response.render(path.join(__dirname + '/views/index.ejs'));
});
router.get('/one', function(request, response) {
	//console.log("redirected");
	response.render(path.join(__dirname + '/views/one.ejs'));
});
router.get('/two', function(request, response) {
	response.render(path.join(__dirname + '/views/two.ejs'));
});
router.get('/three', function(request, response) {
	response.render(path.join(__dirname + '/views/three.ejs'));
});
router.get('/four', function(request, response) {
	response.render(path.join(__dirname + '/views/four.ejs'));
});
router.get('/saved', function(request, response) {
	response.render(path.join(__dirname + '/views/saved.ejs'));
});
router.get('/status', function(request, response) {
	response.render(path.join(__dirname + '/views/status.ejs'));
});
router.get('/normalize', function(request, response) {
	response.render(path.join(__dirname + '/views/normalize.ejs'));
});
router.get('/verify', function(request, response) {
	response.render(path.join(__dirname + '/views/verify.ejs'));
});

app.post('/auth', function(request, response) {
	//response.header('Content-Type','text/html');
	var username = request.body.username;
	var password = request.body.password;
	//var access = request.body.access;
	if (username && password) {
		connection.query('SELECT * FROM login WHERE emp_no = ? AND password = ?', [username, password], function(error, results) {
			
            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				if(results[0].access == 1){
				response.redirect('/one');}
				else if(results[0].access == 2){
				response.redirect('/two');}
				else if(results[0].access == 3)
				response.redirect('/three');
				else if(results[0].access == 4)
				response.redirect('/four');
			} else {
				response.send('Incorrect Username and/or Password');
			}		
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
/*app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/
//app.get('/', addProtection);

app.get('/logout',function(req,res,next){
	req.session.user=undefined;
	res.redirect('/');
	});
	app.post('/addData',addData);
app.get('/four',getHod);
app.post('/yes',yes);
app.get('/verify',getverify)
app.post('/verified',verify);	
app.get('/normalize',getnormalize);
app.post('/normalized',normalize);	
app.post('/bypass',bypass);
app.get('/three',getbypass);
app.get('/two',getSce);
app.get('/status',getStatus);
app.get('/scestatus',getStatusSce);
app.get('/cistatus',getStatusCi);
app.get('/hodstatus',getStatusHodp);
app.get('/saved',getSaved);
app.post('/one', addProtection);
app.use('/',router);
app.post('/save', saveProtection);
app.post('/accept',accept);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});