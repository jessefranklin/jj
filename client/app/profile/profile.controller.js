(function () {

  angular
    .module('app.profile')
    .controller('profileCtrl',  ['$scope','setuserService','authService',profileController]);

  profileController.$inject = ['$scope','setuserService','authService'];

  function profileController($scope,setuserService,authService) {
    var vm = this;
    vm.authService = authService;
    
    authService.getProfileDeferred().then(function (profile) {
      vm.userProfile = profile;
      setuserService.getUser(profile.user_id)
        .then(function(data){
          vm.userData = data.data[0];
        });
    });

  }

}());
