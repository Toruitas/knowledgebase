/**
 * Created by toruitas on 15-12-16.
 */
var app = angular.module('kB',["ngRoute"]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/categories',{
        templateUrl: 'views/categories.view.html',
        controller: 'CategoriesCtrl'
    }).when('/articles',{
        templateUrl: 'views/articles.view.html',
        controller: 'ArticlesCtrl'
    }).when('/articles/details/:id',{
        templateUrl: 'views/article_details.view.html',
        controller: 'ArticlesDetailsCtrl'
    }).when('/articles/category/:category',{ //category name
        templateUrl: 'views/cat_articles.view.html',
        controller: 'ArticlesCategoryCtrl'
    }).when('/articles/add',{
        templateUrl: 'views/add_article.view.html',
        controller: 'ArticleCreateCtrl'
    }).when('/articles/edit/:id',{
        templateUrl: 'views/edit_article.view.html',
        controller: 'ArticleEditCtrl'
    }).otherwise({redirectTo:'/categories'})
}]);