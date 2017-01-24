(function () {

  angular
    .module('app.request')
    .controller('requestCtrl',  ['jobsService','requestService',requestController]);

  requestController.$inject = ['jobsService','requestService'];

  function requestController(jobsService,requestService) {
    var vm = this;

    console.log(requestService.getRequest());

  }

}());
