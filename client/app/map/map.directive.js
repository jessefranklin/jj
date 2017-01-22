(function () {

  angular
    .module('app.map')
    .directive('mapapp', function () {
      return {
        restrict: "E",
        replace: true,
        scope: {
          jobs: '='
        },
        controller: 'mapCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/map/map.template.html'
      };
    });

}());