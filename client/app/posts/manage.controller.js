(function () {

  angular
    .module('app.post')
    .controller('manageCtrl',  ['jobsService','authService',manageController]);

  manageController.$inject = ['jobsService','authService'];

  function manageController(jobsService,authService) {
    var vm = this;
    vm.authService = authService;
    vm.jobs = [];

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      jobsService.getAllByOwner(vm.userProfile.user_id)
        .then(function(data){
          vm.jobs = data.data;
      });

    });

  }

}());
