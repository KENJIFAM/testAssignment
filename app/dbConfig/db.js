
var mongoose = require('mongoose');

/***** insert username and password provided in README file *****/
mongoose.connect('mongodb://username:password@ds043158.mlab.com:43158/nps_orders', { useNewUrlParser: true });
