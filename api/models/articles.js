'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema = new Schema({
  // main attributes
  title:        { type: String , required: true },
  text:         { type: String , required: true },
  page:         { type: Schema.Types.ObjectId, required: true },
  // associated media
  mimetype:     { type: String },
  media:        { type: String },
  // infos
  position:     { type: Number, min: -1 },
  created:      { type: Date, default: Date.now },
  updated:      { type: Date, default: Date.now }
})

module.exports = mongoose.model('Article', ArticleSchema);
