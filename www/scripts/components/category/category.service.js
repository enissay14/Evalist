'use strict';

angular.module('evalistApp')
  .factory('Category', function ($q, Utils) {
        var categoryRepository= {};

        categoryRepository.findAll = function(){
          
          var deferred = $q.defer();
          
          hoodie.store.findAll('category')
            .done(function(allCategories){
                deferred.resolve(Utils.invertArray(allCategories));
            }) 
            .fail(function(error){
                deferred.reject(error.message);
            });
            
            return deferred.promise;
      
        };

        categoryRepository.delete = function(item) {
            
            var deferred = $q.defer();
            
            hoodie.store.remove('category',item.id)
            .done(function(removedCategory){
                deferred.resolve(removedCategory);
            })
            .fail(function(error){
                deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
        
        categoryRepository.add = function(item) {
            
            var deferred = $q.defer();
            
             hoodie.store.add('category',item)
            .done(function(newCategory){
                 deferred.resolve(newCategory);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
        };
        
        categoryRepository.update = function(item, changedProperties) {
            
            var deferred = $q.defer();
            
             hoodie.store.update('category',item.id , changedProperties)
            .done(function(newCategory){
                 deferred.resolve(newCategory);
            })
            .fail(function(error){
                 deferred.reject(error.message);
            });
            
            return deferred.promise;
            
        };
        return categoryRepository;
  
  });