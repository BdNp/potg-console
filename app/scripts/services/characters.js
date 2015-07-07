'use strict';

/**
 * @ngdoc service
 * @name potgApp.characters
 * @description
 * # characters
 * Factory in the potgApp.
 */
angular.module('potgApp')
  .factory('characters', ['$http', function ($http) {
      // Service logic
      // ...
  
      var urlBase = 'http://planetofthegrapes.com/api/';
      //get_category_posts/?id=21'
  
      var api = {
        login: function(user, pass) {

        },
        getCharacters: function() {
          return $http.get(urlBase + 'get_category_posts/?id=21')
                      .success(function(result){
                        console.log(result);
                        var output = [];
                        angular.forEach(result.posts, function(character){
                          output.push({name: character.title, id: character.id});
                        })
                        return output;
                      })
                      .error(function(){
                        $scope.status = 'Unable to load customer data: ' + error.message;
                      });
        },
        getCharacter: function(id) {
          return $http.get(urlBase + 'get_post/?id=' + id);
        },
        updateCharacter: function(id, data) {

        },
        addCharacter: function(data) {

        },
      };
  
      var dummyCharacters = [
        {
          id: '1199',
          name: 'Birdman',
          actor: 'Jared',
          characteristics: [],
          voice: [],
          relationships: [],
          history: [],
          episodes: [],
          live: false
        },
        {
          id: '1199',
          name: 'Bill Clinton',
          actor: 'Derek',
          characteristics: [],
          voice: [],
          relationships: [],
          history: [],
          episodes: [],
          live: false
        },
        {
          id: '1199',
          name: 'Gonzo',
          actor: 'Brad',
          characteristics: ['promiscuous', 'agitated'],
          voice: ['gravelly', 'new york'],
          relationships: [{type: 'Lovers', character: "Everyone"}, {type: 'Enemies', character: 'Al Gore'}],
          history: ['likes to rhyme at the end of sentences'],
          episodes: [704,706,802,805,808],
          live: false
        },
  
      ];
  
      var dummyEpisodes = [704,706,802,805,808];
  
      return {
        api: api,
        // db: dummyCharacters,
        db: api.getCharacters(),
        eps: dummyEpisodes,
        onAir: [],
        editing: dummyCharacters[2],
  
        edit: function(character) {
          self = this;
          
          // Get Character from the APO
          this.api.getCharacter(character.id)
              .success(function(char){
                console.log(char);
              })
              .error(function(){
                console.log('go home');
              });

          this.editing = character;
          angular.forEach(character.relationships, function(relationship){
            r.icon = self.createIcon(relationship.type);
          });
          return this.editing;
        },
  
        createIcon: function(value) {
          switch (value) {
            case 'Friends' :
              return '<span class="fa fa-smile-o"></span>';
              break;
            case 'Enemies' :
              return '<span class="fa fa-frown-o"></span>';
              break;
            case 'Lovers' :
              return '<span class="fa fa-heart"></span>';
              break;
            case 'Ex-Lovers' :
              return '<span class="fa fa-heart fa-stack-1x"></span><span class="fa fa-times fa-stack-2x"></span>'
              break;
            case 'Family' : 
              return '<span class="fa fa-home"></span>';
              break;
            case 'Works With/For' : 
              return '<span class="fa fa-briefcase"></span>';
              break;
            default :
              return '<span class="fa fa-smile-o"></span>';
              break;
          }
        },
      };
      // Public API here
      // return {
      //   someMethod: function () {
      //     return meaningOfLife;
      //   }
      // };
    }]);
