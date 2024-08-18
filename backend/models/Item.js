// backend/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  type:{ type: String , required :true ,
    enum: ["healing","clothes","armor","weapons"],

  }

},{collection:"Items"});

module.exports = mongoose.model('Item', itemSchema);
