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
	
	// $scope.callers = characters.db;

	$scope.onAir = function(character) {
	  console.log(character.live);
	  character.live = true;
	  console.log(character.live);
	  character.standby = false;
    };

	$scope.hangUp = function(character) {
	  $scope.callers.splice($scope.callers.indexOf(character), 1);
	  character.live = false;
	  character.standby = false;
    };

    $scope.getClass = function(character) {
    	if ( character.live ) 
    		return 'character-live';
    	if ( character.live ) 
    		return 'character-lsd';
    	return 'character-waiting';
    }


  });
