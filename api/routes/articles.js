'use strict'

// v1.3 minimize put calls

const Article = require('./../models/articles');

module.exports = function(router) {
  // articles by page api route
  router.route('/articles/:page_id')
  .get((req, res) => {
    Article.find((err, articles) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, articles: articles });
    });
  })

  .post((req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.text = req.body.text;
    article.page = req.params.page_id;
    article.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
    article.media = req.body.media ? req.body.media : undefined;
    article.position = typeof req.body.position === 'number' ? req.body.position : undefined;

    article.save((err, article) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true, article: article });
    });
  });

  // individual media api route
  router.route('/article/:article_id')
  .get((req, res) => {
    Article.findById(req.params.article_id, (err, article) => {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json({ success: true, article: article });
    });
  })

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
    Article.remove({_id: req.params.article_id}, (err) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true });
    });
  });
}
