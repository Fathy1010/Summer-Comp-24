const { Schema, model } = require('mongoose');

const churchSchema = new Schema({
    name: { type: String, required: true,},
    longitude: {type: Number, required: true,},
    latitude: {type: Number, required: true,},
    address: {type: String, required: true,},
  });

module.exports = model('Church', churchSchema);