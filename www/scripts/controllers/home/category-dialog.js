'use strict';

angular.module('evalistApp')
.controller('CategoryDialogController',
    function($scope, $stateParams, $modalInstance, entity, Category, Notification) {
        
        if(entity.name != null) {
            $scope.title = "Edit Category " + entity.name ;
              var message = "Edition aborted";
        }else{
             $scope.title = "Create New Category " ;
               var message = "Creation aborted";
        }
        
        var oldName = entity.name;
        $scope.changedCategory= angular.copy(entity);
        
        $scope.save = function () {
            if ($scope.changedCategory.id!= null) {
                Category.update(entity, $scope.changedCategory)
                    .then( function (newCategory) {
                        Notification.success("Category '"+ oldName +"' changed to '"+ newCategory.name +"'");
                        Category.findAll()
                            .then(function(result) {
                                    $modalInstance.close(result);
                                }, function(reason) {
                                    $modalInstance.dismiss(reason);
                                });
                            }, function(reason) {
                                $modalInstance.dismiss(reason);
                            }); 
            } else {
                Category.add($scope.changedCategory)
                .then(function (newCategory) {
                        Notification.success("Category '"+ newCategory.name +"' created");
                        Category.findAll().then(function(result) {
                                $modalInstance.close(result);
                            });
                        }, function(reason) {
                             $modalInstance.dismiss(reason);
                        });
            }
        };
        
        $scope.cancel = function(){
            $scope.changedCategory = {} ;
            oldName = '';
            $modalInstance.dismiss(message);
            message = '';
            
        }

});