(function () {

  'use strict';

  angular
    .module('app')
    .controller('homeCtrl',['authService','geoservices', HomeController]);

  HomeController.$inject = ['authService','geoservices'];

  function HomeController(authService,geoservices) {
    var vm = this;
    vm.authService = authService;
    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    geoservices.getCurrentLocation();
  }
}());
