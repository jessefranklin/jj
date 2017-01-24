(function () {

  angular
    .module('app.post')
    .controller('detailCtrl',  ['jobsService','requestService','$state','authService','globalFunc','$location',detailController]);

  detailController.$inject = ['jobsService','requestService','$state','authService','globalFunc','$location'];

  function detailController(jobsService,requestService,$state,authService,globalFunc,$location) {
    var vm = this;
    vm.authService = authService;
    vm.image_path = globalFunc.uploadPath;

    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
        vm.job.request.date_required = new Date(vm.job.request.date_required);
        vm.job.request.date_fulfillment_by = new Date(vm.job.request.date_fulfillment_by);
        console.log(vm.job);
    });

    vm.createRequest=function(){
      var request = {
          job_id: vm.job._id,
          job_owner_id: vm.job.owner,
          provider_id: vm.userProfile.user_id,
          provider_name: vm.userProfile.name,
          rating: null,
          status: 'pending',
          stage: 1,
          title: vm.job.title,
          completed: false,
          archived: false
      };

      request.provider_date = '';
      request.bid='';

      requestService.create(request)
        .then(function(data){
          $location.path('/request');
        });
    };

  }

}());
