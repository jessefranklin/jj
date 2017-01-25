(function () {

  angular
    .module('app.post')
    .controller('detailCtrl',  ['jobsService','requestService','$state','authService','globalFunc','$location',detailController]);

  detailController.$inject = ['jobsService','requestService','$state','authService','globalFunc','$location'];

  function detailController(jobsService,requestService,$state,authService,globalFunc,$location) {
    var vm = this;
    vm.authService = authService;
    vm.image_path = globalFunc.uploadPath;
    vm.request = {};

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;

    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
        vm.job.request.date_required = new Date(vm.job.request.date_required);
        vm.job.request.date_fulfillment_by = new Date(vm.job.request.date_fulfillment_by);
        vm.request.provider_date = vm.job.request.date_required;
        vm.request.provider_time = vm.job.request.time_required;
        vm.request.bid=vm.job.cost.total_amount;
        for(var i = 0; i < vm.job.applicants.length; i++) {
            if (vm.job.applicants[i].applicant_id == vm.userProfile.user_id) {
                vm.already_applied = false;
                break;
            }
        }
    });

    vm.createRequest=function(){
      requestService.createRequest(vm.job,vm.userProfile,vm.request);
    };

  }

}());
