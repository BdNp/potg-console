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
	
	$scope.callers = characters.onAir;

	$scope.onAir = function(character) {
	  character.live = true;
	  character.standby = false;
    };

	$scope.hangUp = function(character) {
	  $scope.callers.splice($scope.callers.indexOf(character), 1);
	  character.live = false;
	  character.standby = false;
    };


  });
