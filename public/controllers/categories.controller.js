/**
 * Created by toruitas on 15-12-16.
 */
var app = angular.module("kB");

app.controller('CategoriesCtrl',['$scope','$http', function($scope,$http){
    $http.get('/categories').success(function(data){ // will give us data
        $scope.categories = data;
    });
}]);