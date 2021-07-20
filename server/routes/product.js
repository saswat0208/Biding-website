/* eslint-disable no-console */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadImage', auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename });
  });
});


router.post('/uploadProduct', auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get('/products_by_id', (req, res) => {
  // const type = req.query.type;
  const productIds = req.query.id;

  // if (type === 'array') {
  //   const ids = req.query.id.split(',');
  //   productIds = [];
  //   productIds = ids.map((item) => {
  //     return item;
  //   });
  // }

  // we need to find the product information that belong to product Id
  Product.find({ '_id': { $in: productIds } })
      .populate('writer')
      .exec((err, product) => {
        if (err) return req.status(400).send(err);
        return res.status(200).send(product);
      });
});

router.post('/add_user', (req, res) => {
  // console.log(req.body);
  const productId = req.body.productId;

  // we need to find the product information that belong to product Id
  Product.findOneAndUpdate({ '_id': productId }, { $push: {'buyers': req.body.writer } })
      .exec((err, result) => {
        if (err) return req.status(400).send(err);
        return res.status(200).json({success: true, result});
      });
});


router.post('/remove_user', (req, res) => {
  // console.log(req.body);
  const productId = req.body.productId;

  Product.findOneAndUpdate({ '_id': productId }, { $pull: {'buyers': req.body.writer } })
      .exec((err, result) => {
        if (err) return req.status(400).send(err);
        return res.status(200).json({success: true, result});
      });
});

module.exports = router;
