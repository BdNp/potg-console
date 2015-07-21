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

    $scope.character = characters;
    $scope.episodes = characters.eps;
    $scope.newChar = false;
    $scope.icon = function(a) {
      return characters.createIcon(a);
    }
    
    $scope.$watch(function() {return characters.editing}, function(data){
      console.log('watch');
      console.log(characters.db);
      $scope.characters = characters.db;
      angular.forEach(data.relationship, function(r){
        console.log(r);
        if (r.icon == '') r.icon = $scope.createIcon(r.relationshipStatus);
      });
      $scope.editing = data;
    })

    $scope.multiSelectHanlder = function(target, selection) {
      angular.forEach(data.character, function(character) {
        $scope.editing[category].push({relationshipStatus: data.relationshipStatus, icon: data.icon, character: character});
      });
    }

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
      console.log(typeof(data));
    }

    $scope.removeFromList = function(category, data) {
      $scope.editing[category].splice($scope.editing[category].indexOf(data), 1);
    }

    $scope.toHTML = function(str) {
      return str;
    }

    $scope.newChar = function() {
      $scope.editing = {};
      $scope.newChar = true;
    }

    $scope.sanitize = function(str) {
      console.log('sanitize ' + str);
      return str.toString()
                      .replace(/\s/g, '%20')
                      .replace(/\//g, '%2F')
                      .replace(/['‘’]/g, '%2019')
      // console.log(output);
      // return output;
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

      console.log(character);
      if (character.name != undefined)
        params += '&title=' + $scope.serialize(character.name);
      if (character.actor != undefined)
        params += '&custom[actor]=' + character.actor;
      else params += '&custom[actor]=Brad';
      if (character.characteristics != undefined)
        params += '&custom[characteristics]=' + $scope.serialize(character.characteristics);
      if (character.voice != undefined)
        params += '&custom[voice]=' + $scope.serialize(character.voice);
      if (character.relationships != undefined)
        params += '&custom[relationships]=' + $scope.serialize(character.relationships);
      if (character.history != undefined)
        params += '&custom[history]=' + $scope.serialize(character.history);
      if (character.episodes != undefined)
        params += '&custom[episodes]=' + $scope.serialize(character.episodes);
      console.log(params);

      // New or Update
      if($scope.newChar === true) {
        $scope.character.newChar = true;

        // debug, not needed when posting to WP
        $scope.editing.charID = $scope.characters.length; 
        $scope.characters.push($scope.editing);

        // API new
        // $scope.character.api.addCharacter(params)
        //   .success(function(data) {
        //     console.log('Post successful');
        //     console.log(data);
        //   })
        //   .error(function(err) {
        //     console.log(err);
        //   });

        // No longer a new character, reset new flag
        // $scope.newChar = false;
      } else {
        params += '&id=' + character.id;
        console.log('save');

        // console.log($scope.character);
        // API update
        $scope.character.api.updateCharacter(params)
          .success(function(data) {
            console.log('Post successful');
            console.log(data);
          })
          .error(function(err) {
            console.log(err);
          });
      }
    }

  });
