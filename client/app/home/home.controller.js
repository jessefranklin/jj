(function () {

  'use strict';

  angular
    .module('app')
    .controller('homeCtrl', HomeController);

  HomeController.$inject = ['authService'];

  function HomeController(authService) {

    var vm = this;
    vm.authService = authService;
    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });
    

  }

}());
