'use strict';
// // initialize Hoodie
var hoodie  = new Hoodie();

/**
 * @ngdoc overview
 * @name evalistApp
 * @descriptionitems
 * # evalistApp
 *
 * Main module of the application.
 */
angular
  .module('evalistApp', [
    'ngResource',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui-notification',
    'xeditable'
  ])
  .config(function ($stateProvider,NotificationProvider,$urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      .state('home', {
            url: "",
            views: {
                "todolist": {
                    templateUrl: 'views/home/todolist/todolist.html',
                    controller: 'TodolistCtrl'
                },
                "entries": {
                    templateUrl: 'views/home/entries.html',
                    controller: 'TodolistCtrl'
                },
                "sidebar": {
                    templateUrl: 'views/home/sidebar.html',
                    controller: 'SidebarCtrl'
                }
            }
          
    })
    NotificationProvider.setOptions({
            delay: 10000,
            startTop: 55,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
 
    })
  .run( ['$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams; 
        }
    ]);
