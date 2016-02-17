'use strict';

angular.module('evalistApp')
  .factory('Note', function ($q, Utils) {
        var noteRepository= {};

        noteRepository.findAll = function(categoryId){
          
          var deferred = $q.defer();
          
          hoodie.store.findAll('note'+categoryId)
            .done(function(allNotes){
                deferred.resolve(Utils.invertArray(allNotes));
            }) 
            .fail(function(error){
                deferred.reject(error.message);
            });
            
            return deferred.promise;
      
        };

        noteRepository.delete = function(item) {
            
            var deferred = $q.defer();
            
            hoodie.store.remove('note',item.id)
            .done(function(removedNote){
                deferred.resolve(removedNote);
            })
            .fail(function(error){
                deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
        
        noteRepository.add = function(item) {
            
            var deferred = $q.defer();
             hoodie.store.add('note'+item.categoryId,item)
            .done(function(newNote){
                 deferred.resolve(newNote);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
        
        noteRepository.update = function(item, changedProperties) {
            
            var deferred = $q.defer();
            
             hoodie.store.update('note',item.id , changedProperties)
            .done(function(newNote){
                 deferred.resolve(newNote);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
            
        };
        return noteRepository;
  
  });