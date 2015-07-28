'use strict';

/**
 * @ngdoc function
 * @name potgApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the potgApp
 */
angular.module('potgApp')
  .controller('CharacterCtrl', function ($scope, characters) {

    function getEpisodes() {
      characters.api.getEpisodes()
        .success(function(data){
          characters.eps = data.posts;
          $scope.episodes = characters.eps;
        });
    }

    getEpisodes();
    $scope.character = characters;
    $scope.characters = characters.db;
    $scope.newChar = false;
    $scope.icon = function(a) {
      return characters.createIcon(a);
    }
    
    // Lazy-load
    $scope.$watch(function() {return characters.db}, function(data){
      $scope.characters = characters.db;
    });

    $scope.$watch(function() {return characters.editing}, function(data){
      $scope.editing = data;
      if (data.hasOwnProperty('relationships') ) {
        angular.forEach(data.relationships, function(r){
          if (r.icon == '') r.icon = $scope.createIcon(r.relationshipStatus);
        });
      }
    });

    // Add Story/Relationship/Appearances to their respective lists
    $scope.pushToCategory = function(category, data) {
      if($scope.editing[category].indexOf(data) == -1)
        $scope.editing[category].push(data);
      console.log($scope.editing[category]);
    }

    $scope.addTo = function(category, data) {
      if ($scope.editing[category] == undefined)
        $scope.editing[category] = [];
      if (category == 'relationships') {
        if (data.character == '') return false;
        data.icon = $scope.icon(data.relationshipStatus);
        angular.forEach(data.character, function(character) {
          var output = { 
            ID: $scope.editing[category].length,
            relationshipStatus: data.relationshipStatus, 
            icon: data.icon, 
            character: character
          };
            $scope.pushToCategory(category, output);
        });
      } else {
        data = data.toString();
        $scope.pushToCategory(category, data);
      }
      $scope[data] = '';
    }

    // Remove Story/Relationship/Appearances from their respective lists
    $scope.removeFromList = function(category, data) {
      $scope.editing[category].splice($scope.editing[category].indexOf(data), 1);
    }

    // Render Relationship Icon HTML
    $scope.toHTML = function(str) {
      return str;
    }

    $scope.newChar = function() {
      $scope.editing = {};
      $scope.newChar = true;
    }

    $scope.sanitize = function(str) {
      return str.toString()
                .replace(/\s/g, '%20')
                .replace(/\//g, '%2F')
                .replace(/['‘’]/g, '%27');
    }
    // Serialize the form for WP-API safe writing
    $scope.serialize = function(values) {
      var output = '';
      if(Array.isArray(values)) {
        angular.forEach(values, function(val) {
          // console.log(typeof val);
          if (typeof(val) == "object") {
            output += '[';
            output += 'ID_' + val.ID;
            output += ',status_' + $scope.sanitize(val.relationshipStatus);
            output += ',character_' + $scope.sanitize(val.character);
            output += ']';
          } else {
            output += $scope.sanitize(val);
          }
          if (values.indexOf(val) < (values.length - 1))
            output += ',';
        });
      } else {
        output = $scope.sanitize(values);
      }
      return output;
    };

    $scope.save = function(character) {
      // Convert character details to url params
      var params = '';

      if (character.name != undefined)
        params += '&title=' + $scope.serialize(character.name);
      if (character.actor != undefined)
        params += '&custom_fields[actor]=' + character.actor;
      else params += '&custom[actor]=Brad';
      if (character.characteristics != undefined)
        params += '&custom_fields[characteristics]=' + $scope.serialize(character.characteristics);
      if (character.voice != undefined)
        params += '&custom_fields[voice]=' + $scope.serialize(character.voice);
      if (character.relationships != undefined)
        params += '&custom_fields[relationships]=' + $scope.serialize(character.relationships);
      if (character.history != undefined)
        params += '&custom_fields[history]=' + $scope.serialize(character.history);
      if (character.episodes != undefined)
        params += '&custom_fields[episodes]=' + $scope.serialize(character.episodes);

      // New or Update

      // Get nonce to create or update posts, then perform the call
      $scope.character.api.getNonce('update_post')
        .success(function (data) {
            
          if($scope.newChar === true) {
            $scope.character.newChar = true;

            // debug, not needed when posting to WP
            $scope.editing.id = $scope.characters.length; 
            $scope.characters.push($scope.editing);

            // API new
            $scope.character.api.addCharacter(data.nonce, params)
              .success(function(data) {
                console.log('Post successful');
                console.log(data);
              })
              .error(function(err) {
                console.log(err);
              });

            // No longer a new character, reset new flag
            $scope.newChar = false;
          } else {
            params += '&id=' + character.id;

            // API update
            $scope.character.api.updateCharacter(data.nonce, params)
              .success(function(feedback) {
                console.log('Post successful');
                characters.api.getCharacters()
                  .success(function(data){
                    characters.db = data.posts;
                    angular.forEach(characters.db, function(char){
                      char.title = characters.escapeHTML(char.title);
                    });
                    $scope.characters = characters.db;
                  });
              })
              .error(function(err) {
                console.log(err);
              });
          }
      });
    }

  });
