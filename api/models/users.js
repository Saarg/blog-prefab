'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PageSchema = new Schema({
  mail:         { type: String, required: true },
  password:     { type: String, required: true },
  accessLevel:   { type: Number, required: true },
  pseudo:       { type: String }
})

module.exports = mongoose.model('User', UserSchema);
