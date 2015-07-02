'use strict';

describe('Directive: callersList', function () {

  // load the directive's module
  beforeEach(module('potgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<callers-list></callers-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the callersList directive');
  }));
});
