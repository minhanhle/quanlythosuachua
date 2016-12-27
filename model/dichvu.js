var restful = require('node-restful');
var mongoose = restful.mongoose;

var dichvuSchema = new mongoose.Schema({
	tenDichVu: {
		type: String,
		unique: true
	},
	mota: String,
	phiTheoGio: Number,
	hinhanh: String
});
module.exports = restful.model('dichvu', dichvuSchema);
