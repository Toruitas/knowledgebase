var express = require('express');
var router = express.Router();

var Article = require('../models/article'); // since it is exported, we just assign it to Article object from models

// get articles
router.get('/', function(req, res, next) {  // since we are in articles route, don't need to specify /articles
  Article.getArticles(function(err,articles){
    if(err){
      console.log(err);
    }else{
      res.json(articles);
    }
  })
});

// get an article
router.get('/:id', function(req, res, next) {  // since we are in articles route, don't need to specify /articles/id
  Article.getArticleById(req.params.id, function(err,article){  // gets the :id
    if(err){
      console.log(err);
    }else{
      res.json(article);
    }
  })
});

// get all articles in a category
router.get('/category/:category', function(req, res, next) {
  // category is the name of category
  Article.getArticlesByCategory(req.params.category,function(err,articles){
    if(err){
      console.log(err);
    }else{
      res.json(articles); //res is result
    }
  })
});

router.post('/',function(req,res,next){ //req = request
  // get form values

  // the following  var title = req.body.title; etc doesn't need to be done strictly, can just add directly to
  // new Article, but hey, clarity eh?
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;

  // construct new Article Object
  var newArticle = new Article({
    title:title,
    category:category,
    body:body
  });

  // Create article
  Article.createArticle(newArticle,function(err,article){
    if(err){
      console.log(err);
    }

    // res.location('/articles');
    res.redirect('/articles');
    // res.location sets response header http://stackoverflow.com/questions/22677940/difference-between-location-and-redirect-in-node-js
    // don't actually need to do location before redirect. However, if you use res.location, you can write the response body yourself, and then
    // call res.end() on your own after

  })
});

// update article
// /:id needed?
router.put('/', function(req, res, next){
  var id = req.body.id;
  var data = {
    title: req.body.title,
    category: req.body.category,
    body: req.body.body
  };

  // update article
  Article.updateArticle(id, data, function(err, article){
    if(err){
      console.log(err);
    }

    res.redirect('/articles');
  })
});

// delete article
router.delete('/:id',function(req, res, next){
  var id = req.params.id;

  // delete article
  Article.removeArticle(id, function(err, article){
    if(err){
      console.log(err);
    }

    res.redirect('/articles');
  })
});

module.exports = router;
