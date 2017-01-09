'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PageSchema = new Schema({
  mail:         { type: String, required: true },
  password:     { type: String },
  accesLevel:   { type: Number }
})

module.exports = mongoose.model('User', UserSchema);
