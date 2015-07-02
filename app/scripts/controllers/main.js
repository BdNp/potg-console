'use strict';

/**
 * @ngdoc function
 * @name potgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the potgApp
 */
angular.module('potgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
