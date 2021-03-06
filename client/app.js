(function () {
  'use strict';

  angular
    .module('app', [
      //vendor authO
      'auth0.lock',
      'angular-jwt',
      'angular.filter',
      'angularPayments',
      //angular
      'ui.router',
      //Custom Modules
      'app.profile',
      'app.map',
      'app.post',
      'app.request'
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
              templateUrl: 'app/shell/footer.html',
              controller: 'userCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.post', {
        url: 'post',
        views : {
          'content@' : {
              templateUrl: 'app/posts/manage/post-form.html',
              controller: 'postCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.detail', {
        url: 'detail/:id',
        views : {
          'content@' : {
              templateUrl: 'app/posts/manage/detail.html',
              controller: 'detailCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.search', {
        url: 'list/',
        views : {
          'content@' : {
              templateUrl: 'app/posts/find.list.html',
              controller: 'listCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.edit', {
        url: 'edit/:id',
        views : {
          'content@' : {
              templateUrl: 'app/posts/manage/post-form.html',
              controller: 'editPostCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.manage', {
        url: 'manage',
        views : {
          'content@' : {
              templateUrl: 'app/posts/manage.list.html',
              controller: 'manageCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.profile', {
        url: 'profile',
        views : {
          'content@' : {
              templateUrl: 'app/profile/profile.html',
              controller: 'profileCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.thankyou', {
        url: 'thankyou/:id',
        views : {
          'content@' : {
              templateUrl: 'app/posts/manage/thankyou.html',
              controller: 'thanksCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.request', {
        url: 'request',
        views : {
          'content@' : {
              templateUrl: 'app/request/request.temp.html',
              controller: 'requestCtrl',
              controllerAs: 'vm'
          }
        }
      })
      .state('app.balance', {
        url: 'balance',
        views : {
          'content@' : {
              templateUrl: 'app/profile/balance.html',
              controller: 'profileCtrl',
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

    // Secret Key sk_test_0cZVhmOMFxWEZWHJyj4tSuke
    // test pub key pk_test_m7XJT8LHC63NoYnl2HAw2Vq7
    window.Stripe.setPublishableKey('pk_test_m7XJT8LHC63NoYnl2HAw2Vq7');

  }

})();
