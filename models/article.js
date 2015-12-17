/**
 * Created by toruitas on 15-12-15.
 */

//This whole thing is the article model
// schema is the basic attributes of the model.
// it's not all within one object like a python model

// schema = python models.
var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title:{
        type: String,
        index: true,
        required:true
    },
    body:{
        type:String,
        required: true
    },
    category: {
        type:String,
        index:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

var Article = module.exports = mongoose.model('Article',articleSchema);
//module.exports makes it so we can access this obj outside this file

// in route files will call methods that are in this model file, and from here will call mongoose functions such as save, etc
// from mongodb database

//Get all articles
// Documentation on callback functions for Mongoose: http://mongoosejs.com/docs/queries.html
module.exports.getArticles = function(callback){ //create callback in route file
    Article.find(callback); //find is a mongoose command
};

// Get Article by ID
module.exports.getArticleById = function(id,callback){
    Article.findById(id,callback);
};

// Get category articles: list of all articles in a category
module.exports.getArticlesByCategory = function(category,callback){
    var query = {category:category}; //we want article catgory field to match the category that we have passed in
    Article.find(query,callback);
};

// Create an article
module.exports.createArticle = function(newArticle, callback){
    newArticle.save(callback);
};

// Update an article
module.exports.updateArticle = function(id,data,callback){
    var title = data.title;
    var body = data.body;
    var category = data.category;

    var query = {_id:id}; // is this necessary?

    Article.findById(id,function(err,article){
        //using this article it gets by using this method then updating it
        if(!article){
            return next(new Error('Could not load article'));
        }else{
            //update
            article.title = title;
            article.body = body;
            article.category = category;

            article.save(callback); // could also use update method on this resource
        }
    })
};

// remove article
module.exports.removeArticle = function(id,callback){
    Article.find({_id:id}).remove(callback);
};