(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {

    $stateProvider
      .state('app', {
        url: '/home',
        controller: 'HomeController',
        controllerAs: 'vm',
        views: {
          'header': {
              templateUrl: 'app/shell/header.html'
          },
          'content': {
              templateUrl: 'app/shell/home.html'
          },
          'footer': {
              templateUrl: 'app/shell/footer.html'
          }
        }
      })
      .state('app.home', {
        url: '/home',
        controller: 'HomeController',
        controllerAs: 'vm',
        views : {
          'content@' : {
              templateUrl: 'app/home/home.html'
          }
        }
      })
      .state('app.manage', {
        url: '/manage',
        controller: 'manageCtrl',
        controllerAs: 'vm',
        views : {
          'content@' : {
              templateUrl: 'app/manage/manage.html'
          }
        }
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

    $urlRouterProvider.otherwise('/home');

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  }

})();
