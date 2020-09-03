const mongoose = require('mongoose');

const LangSchema = new mongoose.Schema({
    langue: { type: String, required: true, unique: true,},
    iso: {type: String},
    nativName: {type: String}
  })

  module.exports = mongoose.model('Lang', LangSchema);