(function () {

  angular
    .module('app')
    .controller('userCtrl',  ['$scope','setuserService','authService',userController]);

  userController.$inject = ['$scope','setuserService','authService'];

  function userController($scope,setuserService,authService) {
    var user = this;
    user.authService = authService;
    
    authService.getProfileDeferred().then(function (profile) {
      setuserService.getUser(profile.user_id)
        .then(function(data){
          user.userData = data.data[0];
        });
    });

  }

}());
