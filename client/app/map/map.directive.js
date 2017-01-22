(function () {

  angular
    .module('app.map')
    .directive('mapapp', function () {
      return {
        restrict: "E",
        scope: {
          jobs: '='
        },
        controller: 'mapCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/map/map.template.html'
      };
    });

}());