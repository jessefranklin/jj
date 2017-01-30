(function () {

  angular
    .module('app.post')
    .controller('manageCtrl',  ['$scope','$q','jobsService','setuserService','requestService','authService','Upload',manageController]);

  manageController.$inject = ['$scope','$q','jobsService','setuserService','requestService','authService','Upload'];

  function manageController($scope,$q,jobsService,setuserService,requestService,authService,Upload) {
    var vm = this;
    vm.authService = authService;
    vm.jobs = [];
    var user_id;
    vm.manage = true;
    vm.rating = {};
    vm.paying = {};
    vm.rating.rating = 1;
    vm.isReadonly = false;
    this.rateFunction = function(rating) {
      console.log('Rating selected: ' + rating);
    };

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
            console.log('update view');
        });

      var data = { job_id: id };
      requestService.deleteAll(data);
      setuserService.deleteJobFromUser(user_id,'jobs',data);
      vm.getAllByOwner(user_id);
    };

    // Request
    vm.removeRequest = function(id,rid){
      var data = { request_id: rid };
      requestService.deleteRequest(id,rid,data);
      setuserService.deleteJobFromUser(user_id,'requests',data);
      vm.getRequestsByOwner(user_id);
    };

    vm.revertOffer = function(id,job_id){
      data = { stage:1,status:'pending' };
      job_data = { status:'open' };
      requestService.updateRequest(id,data);
      jobsService.update(job_id,job_data);
      vm.getAllByOwner(user_id);
    };

    vm.acceptOffer = function(id,job_id){
      data = { stage:2,status:'confirmed' };
      job_data = { status:'confirmed' };
      requestService.updateRequest(id,data);
      jobsService.update(job_id,job_data);
      vm.getAllByOwner(user_id);
    };
    
    vm.declineOffer = function(id){
      data = { status:'declined' };
      requestService.updateRequest(id,data);
      vm.getAllByOwner(user_id);
    };


    //Requests
    vm.requestCompleted = function(id){
      data = { stage:3, status:'completed', completed_date:new Date()};
      requestService.updateRequest(id,data);
      vm.getRequestsByOwner(user_id);
    };

    vm.completePost = function(id,r_id){
      setuserService.updateRating(user_id,vm.rating,'provider_rating');
      job_data = { status:'completed' };
      jobsService.update(id,job_data);
      data = { stage:4, status:'feedback'};
      //requestService.updateRequest(r_id,data);
    };

    vm.provider_images = [];
    vm.notifyVendor = function(id){
      if(vm.file){
          Upload.upload({
            url: 'http://localhost:3010/upload',
            data: { file: vm.file }
          }).then(function (resp) {
              console.log(resp.data.data);
              if(resp.data.error_code === 0){
                console.log('Success '+resp.data.data);
                data = {
                  image_name : resp.data.data.filename
                };
                // data = { stage:3, status:'completed', completed_date:new Date()};
                // requestService.updateRequest(id,data);
                vm.getRequestsByOwner(user_id);
              } else {
                console.log('an error occured '+ resp);
              }
          });
      } else {
        data = { stage:3, status:'completed', completed_date:new Date(), notify_comment: vm.notify_comment };
        requestService.updateRequest(id,data);
        vm.getRequestsByOwner(user_id);
      }
    };

    vm.noRatingAndClose = function(id){
      job_data = { status:'completed'};
      jobsService.update(id,job_data);
      vm.getAllByOwner(user_id);
    };

    vm.rateVendor = function(id,r_id){
      setuserService.updateRating(id,vm.rating,'vendor_rating');
      data = { stage:5,status:'closed' };
      requestService.updateRequest(r_id,data);
      vm.getRequestsByOwner(user_id);
    };

    vm.payProvider = function(u_id){
      var payme = {
        currency: "cad"
      };

      if(vm.paying.tip){
        payme.amount = vm.paying.tip+vm.paying.amount;
      } else {
        payme.amount = vm.paying.amount;
      }

      setuserService.getUser(u_id).then(function(data){
        payme.customer = data.data[0].s_customer_token;
        setuserService.processPayment(payme);
      });

      //update request to paid

    };

  }

}());
