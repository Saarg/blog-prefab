'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PageSchema = new Schema({
  // main attributes
  name:         { type: String, required: true },
  description:  { type: String },
  type:     { type: Number, min: 0, max: 2, default: 0 },// articles, activities, medias
  // display
  position:     { type: Number, min: -1, default: -1 },
  inNav:        { type: Boolean, default: false },
  // infos
  created:      { type: Date, default: Date.now },
  updated:      { type: Date, default: Date.now }
})

module.exports = mongoose.model('Page', PageSchema);
