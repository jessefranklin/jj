(function () {

  angular
    .module('app.post')
    .controller('editPostCtrl',['$scope','jobsService','authService','fileUpload','$state','$location','globalFunc', editPostController]);

  editPostController.$inject = ['$scope','jobsService','authService','fileUpload','$state','$location','globalFunc'];

  function editPostController($scope,jobsService,authService,fileUpload,$state,$location,globalFunc) {
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
      geocoder.geocode({ 'address': vm.job.address }, function(results, status) {
        if (status === 'OK') {
          vm.job.location.coordinates = [results[0].geometry.location.lng(),results[0].geometry.location.lat()];
          if($scope.myFile){
            vm.upload();
          } else {
            vm.submitForm();
          }
        }
      });
    };

    vm.upload = function () {
        var file = $scope.myFile;
        var uploadUrl = "/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(resp) {
          console.log(resp.data);
            if(resp.data.error_code === 0){
              console.log('Success '+resp.data.data);
              vm.job.image = {
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
