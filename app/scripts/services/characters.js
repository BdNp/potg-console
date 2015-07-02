'use strict';

/**
 * @ngdoc service
 * @name potgApp.characters
 * @description
 * # characters
 * Factory in the potgApp.
 */
angular.module('potgApp')
  .factory('characters', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    var dummyCharacters = [
      {
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
        name: 'Gonzo',
        actor: 'Brad',
        characteristics: ['promiscuous', 'agitated'],
        voice: ['gravelly', 'new york'],
        relationships: [{type: 'Lovers', character: "Everyone"}],
        history: ['likes to rhyme at the end of sentences'],
        episodes: [704,706,802,805,808],
        live: false
      },

    ];


    return {
      db: dummyCharacters,
      onAir: [],
      editing: dummyCharacters[2],

      edit: function(character) {
        self = this;
        this.editing = character;
        angular.forEach(character.relationships, function(r){
          
          console.log(r.type);
          r.icon = self.createIcon(r.type);
        });
        return this.editing;
      },

      createIcon: function(value) {
        console.log('icon');
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
            return null;
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
  });
