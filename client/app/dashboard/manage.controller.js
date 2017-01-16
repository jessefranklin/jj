(function () {

  angular
    .module('app')
    .controller('manageCtrl',  ['jobsService','authService',manageController]);

  manageController.$inject = ['jobsService','authService'];

  function manageController(jobsService,authService) {
    var vm = this;
    vm.authService = authService;
    vm.jobs = jobsService;

    console.log(jobsService);

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });
  }

}());
