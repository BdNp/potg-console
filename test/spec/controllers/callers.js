'use strict';

describe('Controller: CallersCtrl', function () {

  // load the controller's module
  beforeEach(module('potgApp'));

  var CallersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CallersCtrl = $controller('CallersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
