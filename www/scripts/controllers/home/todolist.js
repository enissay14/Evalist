'use strict';

/**
 * @ngdoc function
 * @name evalistApp.controller:TodolistCtrl
 * @description
 * # TodolistCtrl
 * Controller of the evalistApp
 */
angular.module('evalistApp')
  .controller('TodolistCtrl', function ($scope, Category, Note, $modal, Notification, $state, $q) {
      
        $scope.category= '';
        
        $scope.categories = [];
        
        $scope.init = function() {
            
            Category.findAll().then(function(allCategories){
                $scope.categories = allCategories;
                
                
            }, function(reason) {
                Notification('Failed: ' + reason);
            }).then(function(allCategories){
                
                var promises = [] ; 
                
                for(var i = 0; i < $scope.categories.length ; i++) {
                    promises.push(
                        Note.findAll($scope.categories[i].id)
                    );
                }
                
                $q.all(promises).then(function(allNotes){
                                        for(var i = 0; i < $scope.categories.length ; i++) {
                                            $scope.categories[i].notes = allNotes[i] ;
                                        }
                                    }, function(reason) {
                                            Notification('Failed: ' + reason);
                                    })
            });
        };
        
        $scope.init();
    
        $scope.deleteCategory = function(item) {
            
            Category.delete(item)
            .then(function(removedCategory){ 
                var idx = arrayObjectIndexOf($scope.categories,item);
                $scope.categories.splice(idx, 1);
                Notification.success("Category '"+ removedCategory.name +"' deleted");
            }, function(reason) {
                Notification.error(reason);
            });
            
        };
 
        $scope.addCategory = function () {
            
            $modal.open({
                templateUrl: 'views/home/todolist/category-dialog.html',
                controller: 'CategoryDialogController',
                size: 'sm',
                resolve: {
                        entity: function () {
                                return {name: null, pending: 0, id: null};
                            }
                    }
                })
            .result.then(function(result) {
                 $state.go('home', null, { reload: true });
            }, function(reason) {
                Notification.error(reason);
            });
       
            
        }
        
        $scope.updateCategory = function(category) {
           
            $modal.open({
                templateUrl: 'views/home/todolist/category-dialog.html',
                controller: 'CategoryDialogController',
                size: 'sm',
                resolve: {
                        entity: category
                    }
                })
            .result.then(function(result) {
                $state.go('home', null, { reload: true });
            }, function(reason) {
                Notification.error(reason);
            });
           
        };
        
         $scope.addNote = function (category) {
            
            $modal.open({
                templateUrl: 'views/home/todolist/note-dialog.html',
                controller: 'NoteDialogController',
                size: 'sm',
                resolve: {
                        entity: function () {
                                return {name: null, description: '', deadline: null, tasks: {}, pending: 1, done: 0, id: null, categoryId: category.id};
                            }
                    }
                })
            .result.then(function(result) {
                 $state.go('home', null, { reload: true });
            }, function(reason) {
                Notification.error(reason);
            });
       
            
        }
        
        //goes in Utils but sit here for no
        function arrayObjectIndexOf(arr, obj){
            for(var i = 0; i < arr.length; i++){
                arr[i]._deleted = true;
                if(angular.equals(arr[i], obj)){
                    return i;
                }
            };
            return -1;
        }
        
  });
