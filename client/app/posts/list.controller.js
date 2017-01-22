(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService',listController]);

  listController.$inject = ['jobsService','authService'];

  function listController(jobsService,authService) {
    var vm = this;
    vm.authService = authService;
    vm.markers = {};

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    jobsService.get()
      .then(function(data){
        vm.jobs = data.data;
    });
  }

}());
