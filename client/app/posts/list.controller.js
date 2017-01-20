(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService','uiGmapGoogleMapApi',listController]);

  listController.$inject = ['jobsService','authService','uiGmapGoogleMapApi'];

  function listController(jobsService,authService,uiGmapGoogleMapApi) {
    var vm = this;
    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    vm.map = {
      center: { latitude:43.6392556, longitude: -79.4445523},
      markers: [],
      zoom: 14
    };

    uiGmapGoogleMapApi.then(function(maps) {
      vm.options = { scrollwheel: false} ;
    });

    jobsService.get()
      .then(function(data){
        vm.jobs = data.data;
    });

  }

}());
