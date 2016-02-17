'use strict';

angular.module('evalistApp')
.controller('NoteDialogController',
    function($scope, $stateParams, $modalInstance, entity, Note, Notification, $timeout) {
        
        if(entity.name != null) {
            $scope.title = "Edit Note " + entity.name ;
            var message = "Edition aborted";
        }else{
             $scope.title = "Create New Note " ;
             var message = "Creation aborted";
        }
        
        var oldName = entity.name;
        $scope.changedNote= angular.copy(entity);
        
        $scope.save = function () {
            if ($scope.changedNote.id!= null) {
                Note.update(entity, $scope.changedNote)
                    .then( function (newNote) {
                        Notification.success("Note '"+ oldName +"' changed to '"+ newNote.name +"'");
                        Note.findAll()
                            .then(function(result) {
                                    $modalInstance.close(result);
                                }, function(reason) {
                                    $modalInstance.dismiss(reason);
                                });
                            }, function(reason) {
                                $modalInstance.dismiss(reason);
                            }); 
            } else {
                Note.add($scope.changedNote)
                .then(function (newNote) {
                    
                        console.log(newNote);
                        Notification.success("Note '"+ newNote.name +"' created");
                        Note.findAll().then(function(result) {
                                $modalInstance.close(result);
                            });
                        }, function(reason) {
                             $modalInstance.dismiss(reason);
                        });
            }
        };
        
        // Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.open = function($event) {
			$scope.status.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		
		$scope.format = $scope.formats[0];

		$scope.status = {
			opened: false
		};
	
		$scope.picker = { opened: false }; 
  
		$scope.openPicker = function() {
			$timeout(function() {
				$scope.picker.opened = true;
			});
		};
		
		$scope.closePicker = function() {
			$scope.picker.opened = false;
		};
		
        
        $scope.cancel = function(){
            $scope.changedNote = {} ;
            oldName = '';
            $modalInstance.dismiss(message);
            message = '';
        }

});