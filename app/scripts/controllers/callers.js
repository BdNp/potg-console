'use strict';

/**
 * @ngdoc function
 * @name potgApp.controller:CallersCtrl
 * @description
 * # CallersCtrl
 * Controller of the potgApp
 */
angular.module('potgApp')
  .controller('CallersCtrl', function ($scope, characters) {
	
	$scope.characters = characters.db;
	$scope.callers = characters.onAir;

	$scope.hangUp = function(character) {
	  $scope.callers.splice($scope.callers.indexOf(character), 1);
	  character.live = false;
    }


  });
