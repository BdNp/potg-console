'use strict';

/**
 * @ngdoc function
 * @name potgApp.controller:CharacterlistCtrl
 * @description
 * # CharacterlistCtrl
 * Controller of the potgApp
 */
angular.module('potgApp')
  .controller('CharacterlistCtrl', function ($scope, characters) {
	$scope.characters = characters.db;
	$scope.callers = characters.onAir;
	$scope.editing = characters;

    $scope.edit = function(character) {
    	$scope.editing.edit(character);
    }

    $scope.goLive = function(character) {
      if( $scope.callers.indexOf(character) == -1)
		  $scope.callers.push(character);
	  character.live = true;
    }


  });
