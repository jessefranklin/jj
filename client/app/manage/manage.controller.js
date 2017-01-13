(function () {

  'use strict';

  angular
    .module('app')
    .controller('manageCtrl', manageController);

  manageController.$inject = ['authService'];

  function manageController(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
