
var mongoose = require('mongoose');

/***** insert username and password provided in README file *****/
//mongoose.connect('mongodb://infrastructure:Yw6skafpyD@ds043158.mlab.com:43158/nps_orders');
mongoose.connect('mongodb+srv://order:XAeyXzjMdmCMdhld@order-st7ts.gcp.mongodb.net/orders?retryWrites=true', { useNewUrlParser: true });
