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

    function getCharacters() {
      characters.api.getCharacters()
        .success(function(data){
          var output = [];
          characters.db = [];
          angular.forEach(data.posts, function(character){
            output.push({name: character.title, id: character.id});
            characters.db.push(character.id);
          });
          $scope.characters = output;
          console.log($scope.characters);
          console.log(characters.db);
        });
    }
    // getCharacters();

    $scope.characters = characters.db;
                      
  	$scope.callers = characters.onAir;
  	$scope.editing = characters;
    $scope.newChar = characters.newChar;

    // Clicking the phone icon next to their name makes the character "live"
    $scope.goLive = function(character) {
      if( $scope.callers.indexOf(character) == -1)
		  $scope.callers.push(character);
	  character.live = true;
    }

    // Character edit
    $scope.edit = function(character) {
      $scope.editing.edit(character);
    }

    $scope.$watch('newChar', function(){
      console.log($scope.newChar);
      // $scope.characters.push($scope.editing);
      $scope.newChar = false;
    })


  });
