/* eslint-disable no-console */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {User} = require('../models/User');

router.post('/', (req, res) => {
//   console.log(req);
  const name = req.body.name !== undefined ? req.body.name : req.body.user.name;
  const lastname = req.body.lastname !== undefined ? req.body.lastname : req.body.user.lastname;
  const email = req.body.email !== undefined ? req.body.email : req.body.user.email;
  const image = req.body.image !== undefined ? req.body.image : req.body.user.image;
  console.log(image);
  User.findOneAndUpdate({'_id': req.body.user._id}, {name, lastname, email, 'image': image}).
      exec((err, result) => {
        if (err) {
          console.log(err);
          return res.send(err).status(400);
        };
        return res.status(200).json({success: true, result});
      });
});
module.exports = router;
