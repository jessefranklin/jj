(function () {

  angular
    .module('app.post')
    .controller('manageCtrl',  ['$scope','jobsService','userService','authService',manageController]);

  manageController.$inject = ['$scope','jobsService','userService','authService'];

  function manageController($scope,jobsService,userService,authService) {
    var vm = this;
    vm.authService = authService;
    vm.jobs = [];
    var user_id;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      user_id = vm.userProfile.user_id;
      vm.getAllByOwner(user_id);
    });

    vm.getAllByOwner = function(user_id){
      jobsService.getAllByOwner(user_id)
        .then(function(data){
          vm.jobs = data.data;
      });
    };

    vm.deletePost = function(id){
      //Todo add are you sure dialog
      jobsService.delete(id)
        .then(function(data){
          if(data.data == 'completed'){
            console.log('update view');
          } else {
            console.log('nope');
          }
      });

      var data = {
        job_id: id
      };
      
      userService.updateJobs(user_id,data)
        .then(function(data) {
            console.log(data);
        });


    };
    

  }

}());
