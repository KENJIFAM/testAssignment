const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const path = require('path');

const Order = require('../models/order');

/*****  GET ALL orders from database *****/
router.get('/orders', function (req, res) {
  const sortBy = req.query.sortBy ? req.query.sortBy : "date";
  const sortType = req.query.sortType ? req.query.sortType : -1;
  Order.find({}).sort({[sortBy]: sortType}).exec(function (err, orders) {
    if (err) res.status(500).send("There was a problem finding orders.");
    res.status(200).json(orders);
  });
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '../../index.html'));
});

/***** GET order by id *****/
router.get('/orders/:id', function (req, res) {
  Order.findOne({_id: req.params.id}, function (err, order) {
    if (err) res.status(500).send("This order is not valid!");
    res.status(200).json(order);
  });
});

/***** POST order *****/
router.post('/orders', function (req, res) {
  Order.create(req.body, function (err, order) {
    if (err) res.status(500).send("Cannot create order!");
    res.status(200).json(order);
  });
});

/***** DELETE order by id *****/
router.delete('/orders/:id', function (req, res) {
  Order.findOne({_id: req.params.id}, function (err, order) {
    if (err) res.status(500).send("This order does not exist!");
    order.remove();
    res.status(200).json(order);
  });
});

module.exports = router;
