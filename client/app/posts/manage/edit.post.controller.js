(function () {

  angular
    .module('app.post')
    .controller('editPostCtrl',['jobsService','authService','Upload', '$state','$location','globalFunc', editPostController]);

  editPostController.$inject = ['jobsService','authService','Upload', '$state','$location','globalFunc'];

  function editPostController(jobsService,authService,Upload,$state,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.state = 'edit';
    vm.categories = globalFunc.categories;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
        vm.job.request.date_required = new Date(vm.job.request.date_required);
        vm.job.request.date_fulfillment_by = new Date(vm.job.request.date_fulfillment_by);
    });

    vm.addJob = function(view){
      vm.view = view;
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

    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3010/upload',
            data: {file:file}
        }).then(function (resp) {
            if(resp.data.error_code === 0){
              vm.job.image = {
                image_name : resp.data.data.originalname,
                image_path : resp.data.data.filename
              };
              vm.submitForm();
            } else {
              console.log('an error occured '+ resp);
            }
        });
    };

   
    vm.submitForm = function(){
      jobsService.update(vm.job._id, vm.job)
        .then(function(data) {
            console.log(data);
            vm.loading = false;
            if(vm.view === true){
              $location.path('/detail/' + $state.params.id);
            }
        });
    };

  }

}());
