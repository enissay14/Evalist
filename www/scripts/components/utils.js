'use strict';

angular.module('evalistApp')
  .factory('Utils', function () {
        var utils= {};

        utils.invertArray = function(array){
          
            var inverted = [];
            
            for(var i =  array.length - 1; i >= 0; i--){
                inverted.push(array[i]);
            }
            return inverted;
      
        };
        
        return utils;
  
  });