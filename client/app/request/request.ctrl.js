(function () {

  angular
    .module('app.request')
    .controller('requestCtrl',  ['jobsService','authService',requestController]);

  requestController.$inject = ['jobsService','authService'];

  function requestController(jobsService,authService) {
    var vm = this;

    
  }

}());
