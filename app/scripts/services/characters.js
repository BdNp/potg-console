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
        getEpisodes: function() {
          return $http.get(urlBase + 'api/get_category_posts/?id=110$count=-1')
        },
        getCharacters: function() {
          return $http.get(urlBase + 'api/get_category_posts/?id=21&count=-1');
       },
        getCharacter: function(id) {
          return $http.get(urlBase + 'api/get_post/?id=' + id);
        },
        updateCharacter: function(nonce, params) {
          return $http.get(urlBase + '?json=posts.update_post&nonce=' + nonce + params + '&status=publish' );
        },
        addCharacter: function(params, nonce) {
          return $http.get(urlBase + '?json=posts.create_post&nonce=' + nonce + params + '&status=publish' );
        },
        getNonce: function(method) {
          return $http.get(urlBase + '?json=core.get_nonce&controller=posts&method=' + method);
        }
      };
  
      var dummyCharacters = [
        {
          id: '0',
          name: 'Yoton O’Sunlove',
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

          characteristics: [],
          voice: [],
          relationships: [],
          history: [],
          episodes: [],
          live: false
        },
        {
          id: '2',
          name: 'Clyde the Clown a.k.a The Half-Exploded Clown',
          actor: 'Brad',
          characteristics: 'promiscuous,agitated',
          voice: 'gravelly,new york',
          relationships: [{ID: 0, relationshipStatus: 'Lovers', character: 'Everyone'}, {ID: 1, relationshipStatus: 'Enemies', character: 'Al Gore'}],
          history: ['like\'s to rhyme at the end of sentences'],
          episodes: [704,706,802,805,808],
          live: false
        },
  
      ];
  
      var dummyEpisodes = [704,706,802,805,808];

      return {
        self: this,
        api: api,
        db: dummyCharacters,
        onAir: [],
        editing: {},
        newChar: false,

        escapeHTML: function(str) {
          console.log('escape');
          return str
                    .replace('&#8217;', "'")
        },
        
        edit: function(character) {
          self = this;
          self.editing = 0;
          console.log('edit');
          console.log(self.editing);
          
          // Get Character from the API
          this.api.getCharacter(character.id)
              .success(function(thisCharacter){
                self.editing = {};
                thisCharacter = thisCharacter.post;
                console.log('thisCharacter');
                console.log(thisCharacter);
                self.editing.name = self.escapeHTML(thisCharacter.title);
                self.editing.id = thisCharacter.id;
                self.editing.characteristics = thisCharacter.custom_fields.characteristics || '';
                self.editing.voice = thisCharacter.custom_fields.voice || '';
                self.editing.actor = thisCharacter.custom_fields.actor || '';
                console.log(thisCharacter.custom_fields.relationships);

                // Relationship parser
                // Relationships are SAVED as a stringified array because of the $GET URI constraints
                // So it needs to be run through a series of string splits to break out the keys/values
                if ( thisCharacter.custom_fields.relationships != undefined) {
                    self.editing.relationships = [];
                    var relationships = thisCharacter.custom_fields.relationships[0].toString().split('],[');

                    angular.forEach(relationships, function(relationship) {
                      var output = [];
                      var rawRelationship = relationship.toString().split(',');

                      angular.forEach(rawRelationship, function(rel) {
                        var relationshipArray = rel.replace("[", '').replace("]", "").split(',');

                        angular.forEach(relationshipArray, function(r) {
                          r = r.split('_');
                          if(r[1].substring(r[1].length - 1) == ' ')
                            r[1] = r[1].substring(0, r[1].length - 1);
                          output.push(r[1]);
                        });

                      });

                      self.editing.relationships.push({
                        ID: output[0],
                        status: output[1],
                        character: output[2]
                      });

                    });
                  // console.log(self.editing.relationships);
                } else self.editing.relationships = [];
                self.editing.history = thisCharacter.custom_fields.history || [];
                self.editing.episodes = thisCharacter.custom_fields.episodes || [];
                
                // self.editing = thisCharacter;
                // angular.forEach(thisCharacter.relationships, function(relationship){
                //   relationship.icon = self.createIcon(relationship.type);
                // });
                // console.log(self.editing);
                return self.editing;
              })
              .error(function(){
                console.log('go home');
              });

          //values 

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
