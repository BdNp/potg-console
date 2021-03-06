'use strict';

describe('Directive: characterList', function () {

  // load the directive's module
  beforeEach(module('potgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<character-list></character-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the characterList directive');
  }));
});
