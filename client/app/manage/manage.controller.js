(function () {

  'use strict';

  angular
    .module('app')
    .controller('manageCtrl', manageController);

  manageController.$inject = ['authService'];

  function manageController(authService) {
    var vm = this;
    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });
  }

}());
