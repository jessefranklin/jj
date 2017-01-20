(function () {

  angular
    .module('app.post')
    .controller('detailCtrl',  ['jobsService','$state','authService',detailController]);

  detailController.$inject = ['jobsService','$state','authService'];

  function detailController(jobsService,$state,authService) {
    var vm = this;
    vm.authService = authService;
    
    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
    });

    jobsService.getById($state.params.id)
      .then(function(data){
        vm.job = data.data[0];
    });

  }

}());
