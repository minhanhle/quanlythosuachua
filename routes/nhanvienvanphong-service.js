var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nhanvienvanphong = require('../model/nhanvienvanphong');
var fs = require('fs');

var nhanvienvanphongmodel = mongoose.model('nhanvienvanphong');

/* GET users listing. */
nhanvienvanphong.methods(['post']);
nhanvienvanphong.register(router, '/nhanvienvanphong');

router.post('/nhanvienvanphong', function(req, res) {
	var body = req.body;
	var img = body.hinhanh;
	console.log('hinhanh:'+ img);
	var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	
	var name = new Date().getTime() +"."+ext;
	fs.writeFile("app/images-fixer/" + name, buf);
	body.hinhanh = "images-fixer/" + name;
	console.log('link hinhanh:'+body.hinhanh);
	nhanvienvanphongmodel.save(req.body, function(err, data) {
		if(err) 
			res.send(400, err);
		else 
			res.send(201, data);
	})
})

router.get('/nhanvienvanphong', function (req, res, next) {
	nhanvienvanphongmodel.find({}, function (err, data) {
		if (err)
			res.send(err);
		else
			res.send(data);
	})
});

router.get('/nhanvienvanphong/:cmnd', function (req, res, next) {
	nhanvienvanphongmodel.findOne({
		'cmnd': req.params.cmnd
	}, function (err, data) {
		if (err)
			res.send(err);
		else
			res.send(data);
	})
});

router.put('/nhanvienvanphong/:cmnd', function (req, res, next) {
	nhanvienvanphongmodel.update({
		'cmnd': req.params.cmnd
	}, req.body, function (err, data) {
		if (err)
			res.send(err);
		else
			res.send(data);
	})
});

router.delete('/nhanvienvanphong/:cmnd', function (req, res, next) {
	nhanvienvanphongmodel.remove({
		'cmnd': req.params.cmnd
	}, function (err, data) {
		if (err)
			res.send(err);
		else
			res.send(data);
	})
});

module.exports = router;
