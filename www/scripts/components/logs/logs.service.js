'use strict';

angular.module('evalistApp')
  .factory('Logs', function ($q, Utils) {
        var logRepository= {};

        logRepository.findAll = function(){
          
          var deferred = $q.defer();
          
          hoodie.store.findAll('logs')
            .done(function(allLogs){
                
                deferred.resolve(Utils.invertArray(allLogs));
            }) 
            .fail(function(error){
                deferred.reject(error.message);
            });
            
            return deferred.promise;
      
        };

        logRepository.add = function(item) {
            
            var deferred = $q.defer();
            
             hoodie.store.add('logs',item)
            .done(function(newLog){
                
                 deferred.resolve(newLog);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
       
        logRepository.clear = function() {
            
            var deferred = $q.defer();
            
             hoodie.store.removeAll('logs')
            .done(function(removedLogs){
                 deferred.resolve(removedLogs);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
       
        
        return logRepository;
  
  });