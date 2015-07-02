'use strict';

describe('Controller: CharacterlistCtrl', function () {

  // load the controller's module
  beforeEach(module('potgApp'));

  var CharacterlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CharacterlistCtrl = $controller('CharacterlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
