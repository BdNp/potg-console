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
    $scope.icon = characters.createIcon;
    $scope.$watch(function() {return characters.editing}, function(data){
      console.log('watch');
      // angular.forEach(data.relationship, function(r){
        // console.log(r);
        // if (r.icon == '') r.icon = $scope.createIcon(r.relationshipStatus);
      // });
      $scope.editing = data;
    })

    $scope.save = function(data) {
      $scope.editing.name = data.name;
    }

    $scope.addTo = function(category, data) {
      console.log(data);
      if (data.character == '') return false;
      if(category == 'relationship') data.icon = $scope.icon(data.relationshipStatus);
      if(data.character.length > 0) {
        angular.forEach(data.character, function(character) {
          $scope.editing[category].push({relationshipStatus: data.relationshipStatus, icon: data.icon, character: character});
        });
      } else $scope.editing[category].push(data);
      console.log($scope.editing[category]);
    }

    $scope.removeFromList = function(category, data) {
      $scope.editing[category].splice($scope.editing[category].indexOf(data), 1);
    }

    $scope.toHTML = function(str) {
      return str;
    }

    // $scope.

  });
