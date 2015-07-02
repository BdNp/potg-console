'use strict';

/**
 * @ngdoc directive
 * @name potgApp.directive:characterList
 * @description
 * # characterList
 */
angular.module('potgApp')
  .directive('characterList', function () {
    return {
      templateUrl: '../../views/characterlist.html',
      restrict: 'E',
    };
  });
