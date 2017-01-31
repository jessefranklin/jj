(function () {

  angular
    .module('app.post')
    .controller('postCtrl',['$scope','jobsService','fileUpload','setuserService','authService', '$location','globalFunc', postController]);

  postController.$inject = ['$scope','jobsService','fileUpload','setuserService','authService', '$location','globalFunc'];

  function postController($scope,jobsService,fileUpload,setuserService,authService,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.detail = {};
    vm.state = 'Add';
    vm.job.location = {};
    vm.categories = globalFunc.categories;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });
   
    vm.addJob = function(){
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': vm.job.address}, function(results, status) {
        if (status === 'OK') {
          vm.job.location.type = 'Point';
          vm.job.location.coordinates = [results[0].geometry.location.lng(),results[0].geometry.location.lat()];
          vm.job.owner = vm.userProfile.user_id;
          vm.job.status = 'draft';
          vm.job.request.active = false;

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
      jobsService.create(vm.job)
        .then(function(data) {
            vm.loading = false;
            vm.jobArray = {
              job_id:data.data._id,
              title:data.data.title
            };
            setuserService.addToUser(vm.userProfile,vm.jobArray,'jobs');
            $location.path('/detail/' + data.data._id);
        });
    };

  }

}());
