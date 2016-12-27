var restful = require('node-restful');
var mongoose = restful.mongoose;

var thoSchema = new mongoose.Schema({
	cmnd: {
		type: String,
		unique: true
	},
	hoten: String,
	ngaysinh: Date,
	gioitinh: String,
	sodt: String,
	email: String,
	quequan: String,
	diachihientai: String,
	diachi: {
		tenkhuvuc: String,
		quan: String
	},
	trinhdohocvan: String,
	sotruong: [],
	sonamkinhnghiem: Number,
	motakinhnghiem: String,
	hinhanh: String,
	danhgia: String,
	luongtheogio: Number,
	xacnhan: Boolean
});
module.exports = restful.model('tho', thoSchema);
