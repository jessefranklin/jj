(function () {

  angular
    .module('app.post')
    .controller('editPostCtrl',['jobsService','authService', '$state','$location','globalFunc', editPostController]);

  editPostController.$inject = ['jobsService','authService', '$state','$location','globalFunc'];

  function editPostController(jobsService,authService,$state,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.state = 'edit';

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
        vm.job.request.date_required = new Date(vm.job.request.date_required);
    });

    vm.addJob = function(){
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': vm.job.location.address}, function(results, status) {
        if (status === 'OK') {
          vm.job.location.lat = results[0].geometry.location.lat();
          vm.job.location.long = results[0].geometry.location.lng();
          vm.job.owner = vm.userProfile.user_id;
          if(vm.file){
            if (vm.upload_form.file.$valid && vm.file) {
              vm.upload(vm.file);
            }
          } else {
            vm.submitForm();
          }
        }
      });
    };
   
    vm.submitForm = function(){
      jobsService.update(vm.job._id, vm.job)
        .then(function(data) {
            console.log(data);
            vm.loading = false;
            //$location.path('/detail/' + $state.params.id);
        });
    };

  }

}());
