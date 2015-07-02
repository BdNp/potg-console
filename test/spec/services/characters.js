'use strict';

describe('Service: characters', function () {

  // load the service's module
  beforeEach(module('potgApp'));

  // instantiate service
  var characters;
  beforeEach(inject(function (_characters_) {
    characters = _characters_;
  }));

  it('should do something', function () {
    expect(!!characters).toBe(true);
  });

});
