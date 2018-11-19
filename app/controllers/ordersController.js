var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var path = require('path');


var Order = require('../models/order');



/*****  GET ALL orders from database *****/
router.get('/orders', async (req, res) => {
  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : "date";
    const sortType = req.query.sortType ? req.query.sortType : -1;
    const orders = await Order.find({}).sort({[sortBy]: sortType});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).send("There was a problem finding orders.");
  }
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../../index.html'));
});


/***** GET order by id *****/
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({_id: req.params.id});
    if (order) return res.status(200).json(order);
    return res.status(500).send("This order is not valid!");
  } catch (err) {
    return res.status(500).send("This order is not valid!");
  }
});


/***** POST order *****/
router.post('/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).send("Cannot create order!");
  }
});


/***** DELETE order by id *****/
router.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({_id: req.params.id});
    await order.remove();
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).send("This order does not exist!");
  }
});

module.exports = router;
