(function () {

  angular
    .module('app.profile')
    .directive('profileview', function () {
      return {
        restrict: "E",
        scope: true,
        controller: "profileCtrl",
        controllerAs: "vm",
        templateUrl: 'app/profile/profile.template.html'
      };
    });

}());