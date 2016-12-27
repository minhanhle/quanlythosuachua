var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var index = require('./routes/index');
var mongoose = require('./connect/connect-mongodb');

mongoose.connect;

var app = express();
var router = express.Router();

// view engine setup
app.set('app', path.join(__dirname, 'app'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', require('./routes/tho-service'));
app.use('/', require('./routes/nhanvienvanphong-service'));
app.use('/', require('./routes/yeucau-service'));
app.use('/', require('./routes/dichvu-service'));
app.use('/', require('./routes/quan-service'));
app.use('/', require('./routes/user-service'));
app.use('/', require('./routes/khachhang-service'));
app.use('/', require('./routes/lichbantho-service'));
app.use('/', require('./routes/lichlamviectho-service'));

app.use('/favicon.ico', function (req, res, next) {
	res.end();
});


//send mail
var smtpTransport = nodemailer.createTransport('smtps://rentfixer123%40gmail.com:rentfixer123@@smtp.gmail.com');
app.post('/sendmail', function (req, res) {
	var body = req.body;
	var mailOptions = {
		to: body.mail,
		subject: body.sub,
		html: body.content
	};

	smtpTransport.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
			res.send("error");
		} else {
			console.log("Message sent: " + response.message);
			res.send("sent");
		}
	});
});

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.post('/saveImage', function (req, res) {
	var img = req.body.hinhanh;
	var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	
	var name = new Date().getTime() +"."+ext;
	fs.writeFile("app/images-fixer/" + name, buf);
	res.send("images-fixer/" + name);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
