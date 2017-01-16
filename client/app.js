(function () {
  'use strict';

  angular
    .module('app', [
      //vendor auth
      'auth0.lock',
      'angular-jwt',
      //angular
      'ui.router',
      'ngAutocomplete',
      
      'geolocation'
    ])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$locationProvider' ];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        views: {
          'header': {
              templateUrl: 'app/shell/header.html',
              controller: 'header',
              controllerAs: 'vm'
          },
          'content': {
              templateUrl: 'app/home/home.html',
              controller: 'homeCtrl',
              controllerAs: 'vm'
          },
          'footer': {
              templateUrl: 'app/shell/footer.html'
          }
        }
      })
      .state('app.post', {
        url: 'post',
        views : {
          'content@' : {
              templateUrl: 'app/dashboard/post-form.html',
              controller: 'postCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.detail', {
        url: 'detail/:id',
        views : {
          'content@' : {
              templateUrl: 'app/dashboard/detail.html',
              controller: 'detailCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.manage', {
        url: 'manage',
        views : {
          'content@' : {
              templateUrl: 'app/dashboard/manage.html',
              controller: 'manageCtrl',
              controllerAs: 'vm'
          }
        }
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

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
