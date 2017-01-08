'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConfigSchema = new Schema({
  key:        { type: String , required: true },
  value:      { type: Object },
})

module.exports = mongoose.model('Config', ConfigSchema);
