(function () {

  angular
    .module('app')
    .controller('detailCtrl',  ['jobsService','$state','authService',detailController]);

  detailController.$inject = ['jobsService','$state','authService'];

  function detailController(jobsService,$state,authService) {
    var vm = this;
    vm.authService = authService;
    
    jobsService.getById($state.params.id)
      .then(function(data){
        vm.jobs = data.data[0];
    });

  }

}());
