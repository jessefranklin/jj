(function () {

  angular
    .module('app')
    .controller('postCtrl',['jobsService','authService', '$location','globalFunc',postController]);

  postController.$inject = ['jobsService','authService', '$location','globalFunc'];

  function postController(jobsService,authService,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.categories = globalFunc.categories;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    vm.addJob = function(){
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': vm.job.location.address}, function(results, status) {
        if (status === 'OK') {
          vm.job.location.lat = results[0].geometry.location.lat();
          vm.job.location.long = results[0].geometry.location.lng();
          console.log(vm.userProfile.user_id);
          vm.job.owner = vm.userProfile.user_id;
        }
      });

      jobsService.create(vm.job)
        .then(function(data) {
            console.log(data.data._id);
            vm.loading = false;
            $location.path('/detail/' + data.data._id);
        });
    };
  }

}());
