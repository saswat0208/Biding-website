/* eslint-disable new-cap */
/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const {Product} = require('../models/Product');


// fetching products

router.get('/', (req, res) => {
  Product.find({})
      .then((results) => {
        return res.status(200).send(results);
      });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Product.find({buyers: id})
      .then((results) => {
        return res.status(200).send(results);
      });
});


// fetching products according to user's search
router.post('/search', (req, res) => {
  const term = req.body.searchTerm;

  Product.find({})
      .find({$text: {$search: term}})
      .populate('writer')
      .exec((err, products) => {
        if (err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, products, postSize: products.length});
      });
});


module.exports = router;
