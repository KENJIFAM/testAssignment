
var mongoose = require('mongoose');  

var OrderSchema = new mongoose.Schema({  
  customer: String,
  date: Date,
  isDelivered: Boolean,
  value: Number
});

mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');