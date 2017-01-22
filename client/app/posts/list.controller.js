(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService','uiGmapIsReady',listController]);

  listController.$inject = ['jobsService','authService','uiGmapIsReady'];

  function listController(jobsService,authService,uiGmapIsReady) {
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
