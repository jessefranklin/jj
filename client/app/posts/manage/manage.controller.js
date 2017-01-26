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

    // Remove request
    vm.removeRequest = function(id,rid){
      var data = { request_id: rid };
      var data2 = { job_id: id };

      requestService.deleteRequest(id,rid,data);
      setuserService.deleteJobFromUser(user_id,'requests',data2);
    };

    vm.deletePost = function(id){
      //Todo add are you sure dialog
      jobsService.delete(id)
        .then(function(data){
            console.log('update view');
        });

      var data = { job_id: id };
      setuserService.deleteJobFromUser(user_id,'jobs',data);
    };

    vm.acceptOffer = function(id,job_id){
      data = {stage:2,status:'confirmed'};
      job_data = {status:'confirmed'};
      requestService.updateRequest(id,data);
      jobsService.update(job_id,job_data);
    };
    
    vm.declineOffer = function(id){
      data = { status:'declined' };
      requestService.updateRequest(id,data);

    };

  }

}());
