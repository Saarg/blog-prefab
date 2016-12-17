'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConfigSchema = new Schema({
  key:        { type: String , required: true },
  value:      { type: String },
})

module.exports = mongoose.model('Config', ConfigSchema);
