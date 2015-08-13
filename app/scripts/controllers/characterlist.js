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
  
    $scope.loading = true;
    // API : Get Characters from DB

    function pruneCharacterApi(characterAPI) {
      angular.forEach(characterAPI.db, function(char){
        char.name = characterAPI.escapeHTML(char.title);
        char.actor = char.custom_fields.actor || '';
        char.actor = char.actor[0] || '';
        char.actorInitial = (char.actor != undefined) ? char.actor.substring(0,1) : '';
        char.longName = (char.name.length > 20) ? 'small' : '';
        console.log(char.count);
      });
      $scope.characters = characters.db;
      console.log($scope.characters);
      $scope.loading = false;
    }
    characters.api.getCharacters()
      .success(function(data){
        characters.db = data.posts;
        pruneCharacterApi(characters);
        // angular.forEach(characters.db, function(char){
        //   char.name = characters.escapeHTML(char.title);
        //   char.actor = char.custom_fields.actor || '';
        //   char.actor = char.actor[0] || '';
        //   char.actorInitial = (char.actor != undefined) ? char.actor.substring(0,1) : '';
        //   char.count = char.name.length;
        //   console.log(char.count);
        // });
        // $scope.characters = characters.db;
        // console.log($scope.characters);
        // $scope.loading = false;
      });
    $scope.characters = characters.db;
    angular.forEach(characters.db, function(char){
          char.actorInitial = (char.actor != undefined) ? char.actor.substring(0,1) : '';
          console.log( char.name.length );
          char.longName = (char.name.length > 20) ? 'small' : 'no';
          console.log('o');
        });
    $scope.callers = characters.onAir;
    $scope.newChar = characters.newChar;

    // If a character is created or updated, refresh the list.
    $scope.$watch(function() { return characters.db }, function(data) {
      console.log(characters.db);
      // $scope.characters = characters.db;
      pruneCharacterApi(characters);
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
