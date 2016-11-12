'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MediaSchema  = new Schema({
  // main attributes
  name:         { type: String },
  description:  { type: String },
  page:         { type: Schema.Types.ObjectId, required: true },
  // associated media
  mimetype:     { type: String },
  media:        { type: String, required: true },
  position:     { type: Number, min: -1 },
  // infos
  created:      { type: Date, default: Date.now },
  updated:      { type: Date, default: Date.now }
})

module.exports = mongoose.model('Media', MediaSchema);
