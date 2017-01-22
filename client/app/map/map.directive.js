(function () {

  angular
    .module('app.map')
    .directive('mapapp', function () {
      return {
        restrict: "E",
        scope: {
          searchtext:'='
        },
        controller: 'mapCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/map/map.template.html'
      };
    });

}());