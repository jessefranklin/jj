(function () {

  angular
    .module('app.post')
    .controller('detailCtrl',  ['$scope','jobsService','requestService','$state','authService','globalFunc','$location','setuserService','$document',detailController]);

  detailController.$inject = ['$scope','jobsService','requestService','$state','authService','globalFunc','$location','setuserService','$document'];

  function detailController($scope,jobsService,requestService,$state,authService,globalFunc,$location,setuserService,$document) {
    var vm = this;
    vm.authService = authService;
    vm.image_path = globalFunc.uploadPath;
    vm.request = {};
    vm.requestformstatus = 'form';

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      setuserService.getUser(profile.user_id)
        .then(function(data){
          vm.userData = data.data[0];
          console.log(vm.userData);
        });
    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
        vm.request.bid=vm.job.cost.total_amount;
        for(var i = 0; i < vm.job.applicants.length; i++) {
            if (vm.job.applicants[i].applicant_id == vm.userProfile.user_id) {
                vm.already_applied = true;
                break;
            }
        }
    });

    vm.createRequest=function(){
      vm.requestformstatus = 'review';
      requestService.createRequest(vm.job,vm.userProfile,vm.request);
    };

    vm.confirm=function(){
      requestService.submitRequest();
    };

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
        console.log('it failed! error: ' + result.error.message);
      } else {
        var email = vm.userData.email?vm.userData.email:vm.emailAdd;
        var data = {
          stripeToken: result.id,
          email: email
        };
        setuserService.createStripeUser(data,vm.userProfile.user_id);
      }
    };

    vm.approveCardtoProfile= function(j_id){
      if ($scope.checkoutForm.$valid) {
        var data = {
          status:'open'
        };
        jobsService.update(j_id,data);
        vm.job.status = 'open';
        angular.element(document.querySelector('#paymentModal')).modal('hide');

        if(!vm.userData.email){
          var userData = {
            email:vm.emailAdd
          };
          setuserService.update(vm.userProfile.user_id,userData);
          $location.path('/thankyou/' + j_id);
        }
      }
    };

    vm.publishPost= function(j_id){
      var data = {
        status:'open'
      };
      vm.job.status = 'open';
      jobsService.update(j_id,data)
        .then(function(){
          $location.path('/thankyou/' + j_id);
        });
    };

  }

}());
