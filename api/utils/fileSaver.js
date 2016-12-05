'use strict'

const fs           = require('fs');
const mongoose     = require('mongoose');
const Path         = require('path');

module.exports = (folder, file) => {
  const type = file.match(/data:image\/([a-zA-Z0-9-.+]+).*,.*/)[1];
  if(file && type) {
    const fileBuffer = new Buffer(file.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

    let media = mongoose.Types.ObjectId() + '.' + type;

    fs.writeFile(__dirname + '/../data/' + folder + '/' + media, fileBuffer, (err) => {
      if(err) {
        console.error(err);
        //TODO handle failled writeFile
      }
    });

    return media;
  }

  return '';
}
