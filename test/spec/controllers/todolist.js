'use strict';

describe('Controller: TodolistCtrl', function () {

  // load the controller's module
  beforeEach(module('evalistApp'));

  var TodolistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodolistCtrl = $controller('TodolistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodolistCtrl.awesomeThings.length).toBe(3);
  });
});
