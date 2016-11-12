'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PageSchema = new Schema({
  // main attributes
  name:         { type: String, required: true },
  description:  { type: String, required: true },
  // display
  position:     { type: Number, min: -1 },
  inNav:        { type: Boolean, default: false },
  // infos
  created:      { type: Date, default: Date.now },
  updated:      { type: Date, default: Date.now }
})

module.exports = mongoose.model('Page', PageSchema);
