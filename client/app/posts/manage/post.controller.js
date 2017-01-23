(function () {

  angular
    .module('app.post')
    .controller('postCtrl',['jobsService','Upload','authService', '$location','globalFunc', postController]);

  postController.$inject = ['jobsService','Upload','authService', '$location','globalFunc'];

  function postController(jobsService,Upload,authService,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.state = 'Add';
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
            console.log(resp.data.data);
            if(resp.data.error_code === 0){
              console.log('Success '+resp.data.data);
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
      jobsService.create(vm.job)
        .then(function(data) {
            vm.loading = false;
            $location.path('/detail/' + data.data._id);
        });
    };

  }

}());
