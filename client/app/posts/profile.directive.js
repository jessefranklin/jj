(function () {

  angular
    .module('app.post')
    .directive('profileview', function () {
      return {
        restrict: "E",
        scope: {
          user: '='
        },
        templateUrl: 'app/posts/profile.template.html'
      };
    });

}());