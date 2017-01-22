(function () {

  angular
    .module('app.post')
    .controller('listCtrl',  ['jobsService','authService','ngMap',listController]);

  listController.$inject = ['jobsService','authService','ngMap'];

  function listController(jobsService,authService,ngMap) {
    var vm = this;
    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });



    jobsService.get()
      .then(function(data){
        vm.jobs = data.data;
    });


    vm.dynMarkers = [];
    NgMap.getMap().then(function(map) {
      for (var i=0; i<1000; i++) {
        var latLng = new google.maps.LatLng(markers[i].position[0], markers[i].position[1]);
        vm.dynMarkers.push(new google.maps.Marker({position:latLng}));
      }
      vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
    });
      
  }

}());
