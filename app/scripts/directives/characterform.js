'use strict';

/**
 * @ngdoc directive
 * @name potgApp.directive:characterForm
 * @description
 * # characterForm
 */
angular.module('potgApp')
  .directive('characterForm', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the characterForm directive');
      }
    };
  });
