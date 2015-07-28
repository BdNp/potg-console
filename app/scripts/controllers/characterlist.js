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
  
    // API : Get Characters from DB
    characters.api.getCharacters()
      .success(function(data){
        characters.db = data.posts;
        angular.forEach(characters.db, function(char){
          char.title = characters.escapeHTML(char.title);
        });
        $scope.characters = characters.db;
      });
    
    $scope.callers = characters.onAir;
    $scope.newChar = characters.newChar;

    // If a character is created or updated, refresh the list.
    $scope.$watch(function() { return characters.db }, function(data) {
      $scope.characters = characters.db;
    })

    // Clicking the phone icon next to their name makes the character "live"
    $scope.goLive = function(character) {
  	  character.standby = true;
      if( $scope.callers.indexOf(character) == -1)
        $scope.callers.push(character);
    }

    // Character edit
    $scope.edit = function(character) {
      characters.edit(character);
    }

    $scope.$watch('newChar', function(){
      $scope.newChar = false;
    })

  });
