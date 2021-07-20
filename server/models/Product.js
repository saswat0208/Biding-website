/* eslint-disable new-cap */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  soldTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    maxlength: 15,
  },
  description: {
    type: String,
  },
  basePrice: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  category: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
  },
  timeslot: {
    type: Number,
    default: 1,
  },
  buyers: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true});


productSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};
