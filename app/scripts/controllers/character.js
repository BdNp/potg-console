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

    $scope.characters = characters.db;
    $scope.character = characters;
    $scope.episodes = characters.eps;
    $scope.newChar = false;
    $scope.icon = function(a) {
      return characters.createIcon(a);
    }
    $scope.$watch(function() {return characters.editing}, function(data){
      // console.log('watch');
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
      if (Array.isArray(data)) {
        angular.forEach(data, function(item){
          $scope.editing[category].push(item);
        });
      } else
        $scope.editing[category].push(data);
      console.log($scope.editing[category]);
    }

    $scope.addTo = function(category, data) {
      if (category == 'relationships') {
        if (data.character == '') return false;
        data.icon = $scope.icon(data.relationshipStatus);
        angular.forEach(data.character, function(character) {
            $scope.pushToCategory(category, {relationshipStatus: data.relationshipStatus, icon: data.icon, character: character})
        });
      } else {
        $scope.pushToCategory(category, data);
      }
      $scope[data] = '';
      console.log($scope.editing[category]);
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

    $scope.save = function(character) {
      // Convert character details to url params
      var params;
      
      params += '&title=' + character.name;
      params += '&custom[actor]=' + character.actor;
      params += '&custom[characteristics]=' + serialize(character.characteristics);
      params += '&custom[voice]=' + serialize(character.voice);
      params += '&custom[relationships]=' + serialize(character.relationships);
      params += '&custom[history]=' + serialize(character.history);
      params += '&custom[episodes]=' + serialize(character.episodes);
      console.log(params);

      // New or Update
      if($scope.newChar === true) {
        $scope.character.newChar = true;

        // debug, not needed when posting to WP
        $scope.editing.charID = $scope.characters.length; 
        $scope.characters.push($scope.editing);

        // API new
        // characters.addCharacter(params);

        // No longer a new character, reset new flag
        $scope.newChar = false;
      } else {
        params += '&id=' + character.id;
        console.log('save');

        // API new
        // characters.updateCharacter(params);
      }
    }

  });
