'use strict';

/**
 * @ngdoc directive
 * @name potgApp.directive:callersList
 * @description
 * # callersList
 */
angular.module('potgApp')
  .directive('callersList', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the callersList directive');
      }
    };
  });
