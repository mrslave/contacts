var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Contact = new Schema({
  id : {type: String, require: true, trim: true, unique: true},
  name : {type : String, required : true, trim : true},
  email : String,
  phone : String,
  address : String,
  birth : String,
  desc : String
});

module.exports = mongoose.model('Contact', Contact);