'use strict';

/**
 * @ngdoc service
 * @name potgApp.characters
 * @description
 * # characters
 * Factory in the potgApp.
 */
angular.module('potgApp')
  .factory('characters', ['$http', function ($http, $q) {

      var urlBase = 'http://planetofthegrapes.com/';
  
      var api = {
        login: function(user, pass) {

        },
        getCharacters: function() {
          return $http.get(urlBase + 'api/get_category_posts/?id=21')
        },
        getCharacter: function(id) {
          return $http.get(urlBase + 'api/get_post/?id=' + id);
        },
        updateCharacter: function(params) {
          return $http.get(urlBase + '?json=posts.update_post&nonce=' + this.getNonce('update_post') + params + '&status=publish' );
        },
        addCharacter: function(params) {
          return $http.get(urlBase + '?json=posts.create_post&nonce=' + this.getNonce('create_post') + params + '&status=publish' );
        },
        getNonce: function(method) {
          return $http.get(urlBase + '?json=core.get_nonce&controller=posts&method=' + method + '&callback=?');
        }
      };
  
      var dummyCharacters = [
        {
          id: '0',
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
          id: '1',
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
          id: '2',
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
        db: dummyCharacters,
        IDs: [1,2,3],
        eps: dummyEpisodes,
        onAir: [],
        editing: dummyCharacters[2],
        newChar: false,
  
        edit: function(character) {
          self = this;
          
          // Get Character from the API
          this.api.getCharacter(character.id)
              .success(function(char){
                console.log(char);
              })
              .error(function(){
                console.log('go home');
              });

          this.editing = character;
          angular.forEach(character.relationships, function(relationship){
            relationship.icon = self.createIcon(relationship.type);
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

    }]);
