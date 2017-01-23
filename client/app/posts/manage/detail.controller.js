(function () {

  angular
    .module('app.post')
    .controller('detailCtrl',  ['jobsService','$state','authService','globalFunc',detailController]);

  detailController.$inject = ['jobsService','$state','authService','globalFunc'];

  function detailController(jobsService,$state,authService,globalFunc) {
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
    });

  }

}());
