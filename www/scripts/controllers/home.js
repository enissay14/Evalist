'use strict';

/**
 * @ngdoc function
 * @name evalistApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the evalistApp
 */
angular.module('evalistApp')
  .controller('HomeCtrl', function ($scope) {
      
    $scope.hoodie = 'logged in with hoodie - ' + hoodie.account.username;
     
    $scope.currentTodolist = true;
    $scope.currentEntries = false;
    
    $scope.activateTodolist = function(){
        $scope.currentTodolist = true;
        $scope.currentEntries = false;
    };
    
    $scope.activateEntries = function(){
        $scope.currentTodolist = false;
        $scope.currentEntries = true;
    };
  });
