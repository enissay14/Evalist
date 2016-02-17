'use strict';

/**
 * @ngdoc function
 * @name evalistApp.controller:EntriesCtrl
 * @description
 * # EntriesCtrl
 * Controller of the evalistApp
 */
angular.module('evalistApp')
  .controller('SidebarCtrl', function ($scope,Logs,Notification) {
      
        $scope.logs = [];
        var logEntry = {message: null, date: null};
        
        $scope.init = function() {
            
            Logs.findAll().then(function(allLogs){
                $scope.logs = allLogs;
            }, function(reason) {
                alert('Failed: ' + reason);
            });
        };
        
        $scope.init();
        
        var addLog = function(entry) {
            Logs.add(entry)
            .then(function(newLog){
                $scope.logs.push(newLog);
             }, function(reason) {
                Notification.error('Failed: ' + reason);
            });
        };
        
        $scope.clearLog = function() {
            Logs.clear()
            .then(function(removedLogs){
                $scope.logs = [];
                Notification.success("All logs removed");
            },function(reason) {
                alert('Failed: ' + reason);
            });
        }; 
        
        //event listeners to log activity
        hoodie.store.on('category:add', function(newCategory) {
            logEntry.message = "Category '"+ newCategory.name +"' created ";
            logEntry.date = $scope.date();
            addLog(logEntry);
            logEntry = {message: null, date: null};
        });
        
        hoodie.store.on('category:remove', function(removedCategory) {
            logEntry.message = "Category '"+ removedCategory.name +"' deleted ";
            logEntry.date = $scope.date();
            addLog(logEntry);
            logEntry = {message: null, date: null};
        });
        
        $scope.date = function() {
                var currentdate = new Date(); 
                var datetime = "Sync: " + currentdate.getDate() + "/"
                                        + (currentdate.getMonth()+1)  + "/" 
                                        + currentdate.getFullYear() + " @ "  
                                        + currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();
                                                return datetime;
        };
  });