'use strict'

// v1.5 addedarticles count

const fileSaver    = require('./../utils/fileSaver');
const Article      = require('./../models/articles');
const fs           = require('fs');

module.exports = (privateRouter, publicRouter) => {
  // articles by page api route
  publicRouter.route('/articles/:page_id/count')
  .get((req, res) => {
    Article.count({ page: req.params.page_id })
    .exec((err, count) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, count: count });
    });
  });

  // articles by page api route
  publicRouter.route('/articles/:page_id/:offset?/:limit?')
  .get((req, res) => {
    Article.find({ page: req.params.page_id })
    .sort({created: -1})
    .skip(parseInt(req.params.offset) ? parseInt(req.params.offset) : 0)
    .limit(parseInt(req.params.limit) ? parseInt(req.params.limit) : 5)
    .exec((err, articles) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, articles: articles });
    });
  });

  privateRouter.route('/articles/:page_id')
  .post((req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.text = req.body.text;
    article.page = req.params.page_id;
    article.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
    article.media = req.body.media ? req.body.media : undefined;
    article.position = typeof req.body.position === 'number' ? req.body.position : undefined;

    if(req.body.media && req.body.mimetype === 'image') {
      article.mimetype = req.body.media.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
      article.media = fileSaver('media', req.body.media);
    } else if (req.body.media && req.body.mimetype === 'youtube') {
      article.mimetype = "youtube";
      article.media = req.body.media.replace("watch?v=", "embed/");
    }

    article.save((err, article) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, article: article });
    });
  });

  // individual media api route
  publicRouter.route('/article/:article_id')
  .get((req, res) => {
    Article.findById(req.params.article_id, (err, article) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, article: article });
    });
  })

  privateRouter.route('/article/:article_id')
  .put((req, res) => {
    Article.findById(req.params.article_id, (err, article) => {
      if (err) res.send(err);
      article.title = req.body.title ? req.body.title : article.title;
      article.text = req.body.text ? req.body.text : article.text;
      article.page = req.body.page ? req.body.page : article.page;
      article.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
      article.media = req.body.media ? req.body.media : undefined;
      article.position = typeof req.body.position === 'number' ? req.body.position : undefined;
      article.updated = Date.now();

      if(req.body.media && req.body.mimetype === 'image') {
        article.mimetype = req.body.media.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        article.media = fileSaver('media', req.body.media);
      } else if (req.body.media && req.body.mimetype === 'youtube') {
        article.mimetype = "youtube";
        article.media = req.body.media.replace("watch?v=", "embed/");
      }

      article.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, article: article });
      });
    });
  })

  .delete((req, res) => {
    Article.findById(req.params.article_id, (err, article) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }

      if (article.mimetype.slice(0, 5) === 'image' && article.media) {
        fs.unlink(__dirname + '/../data/media/' + article.media, (err) => {
          if(err) {
            res.json({ success: false, message: err });
          }
        });
      }

      Article.remove({_id: article._id}, (err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true });
      });
    });
  });
}
