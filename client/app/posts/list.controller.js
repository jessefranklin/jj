(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService','myservice',listController]);

  listController.$inject = ['jobsService','authService','myservice'];

  function listController(jobsService,authService,myservice) {
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
