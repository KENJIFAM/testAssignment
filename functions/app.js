const express = require('express');
const app = express();
const db = require('./app/dbConfig/db');
const path = require('path');
const OrdersController = require('./app/controllers/ordersController');

app.use('/', OrdersController);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
