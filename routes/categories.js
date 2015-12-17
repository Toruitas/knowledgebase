/**
 * Created by toruitas on 15-12-15.
 */
var express = require('express');
var router = express.Router();

var Category = require('../models/category');

// get categories
router.get('/', function(req, res, next) {
  Category.getCategories(function(err,categories){
    if(err){
      console.log(err);
    }else{
      res.json(categories);
    }
  })
});

// get a category
router.get('/:id', function(req, res, next) {
  Category.getCategoryById(req.params.id, function(err,category){  // gets the :id
    if(err){
      console.log(err);
    }else{
      res.json(category);
    }
  })
});



module.exports = router;