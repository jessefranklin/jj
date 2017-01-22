(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService','uiGmapIsReady','uiGmapGoogleMapApi','geoservices',listController]);

  listController.$inject = ['jobsService','authService','uiGmapIsReady','uiGmapGoogleMapApi','geoservices'];

  function listController(jobsService,authService,uiGmapIsReady,uiGmapGoogleMapApi,geoservices) {
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
