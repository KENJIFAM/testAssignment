
var app = require('./app');
var OrdersController = require('./app/controllers/ordersController');


app.use('/', OrdersController);

var port = 3000;


var server = app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});

module.exports = server;
