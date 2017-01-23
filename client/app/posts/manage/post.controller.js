(function () {

  angular
    .module('app.post')
    .controller('postCtrl',['jobsService','userService','Upload','authService', '$location','globalFunc', postController]);

  postController.$inject = ['jobsService','userService','Upload','authService', '$location','globalFunc'];

  function postController(jobsService,userService,Upload,authService,$location,globalFunc) {
    var vm = this, geocoder;
    vm.authService = authService;
    vm.job = {};
    vm.detail = {};
    vm.state = 'Add';
    vm.categories = globalFunc.categories;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      vm.user_data = {
        user_id: vm.userProfile.user_id,
        name: vm.userProfile.name,
        email: vm.userProfile.email || null,
        picture: vm.userProfile.picture,
        role: 'employer',
        status: 'active',
      };
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
            vm.detail.d_id = data.data._id;
            vm.detail.name = data.data.title;
            vm.addToUser();
            $location.path('/detail/' + data.data._id);
        });
    };



    vm.addToUser = function(){
      vm.jobArray = {
        job_id:vm.detail.d_id,
        title:vm.detail.name
      };
      userService.getById(vm.userProfile.user_id)
        .then(function(data) {
            if(data.data.length){
              vm.user_data = data.data;
              vm.updateUser();
            } else {
              vm.createUser();
            }
        });
    };

    vm.createUser = function(){
      vm.user_data.jobs = vm.jobArray;
      userService.create(vm.user_data)
        .then(function(data) {
            console.log('user created');
        });
    };

    vm.updateUser = function(){
      vm.user_data[0].jobs[vm.user_data[0].jobs.length]=vm.jobArray;
      userService.update(vm.userProfile.user_id,vm.user_data[0])
        .then(function(data) {
            console.log('update user');
        });
    };

  }

}());
