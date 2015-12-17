/**
 * Created by toruitas on 15-12-16.
 */

var app = angular.module("kB");

app.controller('ArticlesCtrl',['$scope','$http', function($scope,$http){
    $http.get('/articles').success(function(data){ // will give us data
        $scope.articles = data;
    });
}]);

app.controller('ArticlesCategoryCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
    $http.get('/articles/category/'+$routeParams.category).success(function(data){ // $routeParams.category gets parameters from route
        $scope.cat_articles = data;
        $scope.category = $routeParams.category; // so we can have heading at top for category
    });
}]);

app.controller('ArticlesDetailsCtrl',['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){
    $http.get('/articles/'+$routeParams.id).success(function(data){ // will give us data
        $scope.article = data;
    });

    $scope.removeArticle = function(){
        $http.delete('/articles/'+$routeParams.id).success(function(data){
            console.log(data);
            console.log('successful deletion');
        });

        $location.path('/articles')
    }
}]);

app.controller('ArticleCreateCtrl',['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){
    $http.get('/categories').success(function(data){ // will give us data
        $scope.categories = data;
    });

    $scope.addArticle = function(){
        var data = {
            title: $scope.title,
            body: $scope.body,
            category: $scope.category
        };

        $http.post('/articles',data).success(function(data,status){
            console.log(status)
        });

        $location.path('/articles')
    }
}]);

app.controller('ArticleEditCtrl',['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){
    $http.get('/categories').success(function(data){ // will give us categories
        $scope.categories = data;
    });

    $http.get('/articles/'+$routeParams.id).success(function(data){ // will give us article data
        $scope.article = data;
    });

    $scope.updateArticle = function(){
        var data = {
            id: $routeParams.id,
            title: $scope.article.title,
            body: $scope.article.body,
            category: $scope.article.category
        };

        $http.put('/articles',data).success(function(data,status){
            console.log(status)
        });

        $location.path('/articles')
    }
}]);