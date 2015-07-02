'use strict';

/**
 * @ngdoc overview
 * @name potgApp
 * @description
 * # potgApp
 *
 * Main module of the application.
 */
angular
  .module('potgApp', [
    'ngRoute',
    'ngSanitize',
    'angucomplete'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
