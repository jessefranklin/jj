(function () {

  angular
    .module('app.request')
    .controller('requestCtrl',  ['jobsService','requestService',requestController]);

  requestController.$inject = ['jobsService','requestService'];

  function requestController(jobsService,requestService) {
    var vm = this;

    vm.request = requestService.getRequest()[0];

    vm.confirm = function(){
      requestService.submitRequest();
    };
  }

}());
