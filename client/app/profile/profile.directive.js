(function () {

  angular
    .module('app.profile')
    .directive('profileview', function () {
      return {
        restrict: "E",
        scope: {
          user: '='
        },
        templateUrl: 'app/profile/profile.template.html'
      };
    });

}());