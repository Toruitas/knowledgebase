/**
 * Created by toruitas on 15-12-15.
 */


// schema = python models.
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name:{
        type: String,
        index: true,
        required:true
    },
    description:{
        type: String
    }
});

var Category = module.exports = mongoose.model('Category',categorySchema);
//module.exports makes it so we can access this obj outside this file

// in route files will call methods that are in this model file, and from here will call mongoose functions such as save, etc
// from mongodb database

//Get all categories
// Documentation on callback functions for Mongoose: http://mongoosejs.com/docs/queries.html
module.exports.getCategories = function(callback){ //create callback in route file
    Category.find(callback); //find is a mongoose command
};

// Get Category by ID
module.exports.getCategoryById = function(id,callback){
    Category.findById(id,callback);
};

// Get category articles: list of all articles in a category
module.exports.getArticlesByCategory = function(category,callback){
    var query = {category:category}; //we want article category field to match the category that we have passed in
    Category.find(query,callback);
};

// create category
module.exports.postCategory = function(newCategory,callback){
    // newCategory: string new category name
    newCategory.save(callback);
};