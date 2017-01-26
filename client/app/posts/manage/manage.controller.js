(function () {

  angular
    .module('app.post')
    .controller('manageCtrl',  ['$scope','$q','jobsService','setuserService','requestService','authService',manageController]);

  manageController.$inject = ['$scope','$q','jobsService','setuserService','requestService','authService'];

  function manageController($scope,$q,jobsService,setuserService,requestService,authService) {
    var vm = this;
    vm.authService = authService;
    vm.jobs = [];
    var user_id;
    vm.manage = true;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      user_id = vm.userProfile.user_id;
      vm.getAllByOwner(user_id);
      vm.getRequestsByOwner(user_id);
    });

    vm.getRequestsByOwner = function(id){
      requestService.getRequestsByOwner(id)
        .then(function(user_data){
          vm.manageRequests = user_data.data;
      });
    };

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

      setuserService.deleteJobFromUser(user_id,id);
    };

    vm.acceptOffer = function(id){
      console.log('accept'+id);
    };
    
    vm.declineOffer = function(id){
      console.log('decline'+id);
    };

  }

}());
