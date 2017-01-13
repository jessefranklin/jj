(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'authManager', 'lock'];

  function run($rootScope, authService, authManager, lock) {
    $rootScope.authService = authService;
    authService.registerAuthenticationListener();
    authManager.checkAuthOnRefresh();
    lock.interceptHash();
  }

})();
