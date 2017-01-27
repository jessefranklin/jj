(function () {

  angular
    .module('app.post')
    .directive('joblist', function () {
      return {
        restrict: "E",
        replace: true,
        scope: true,
        template: "<ul><jobdetail ng-repeat='job in vm.jobs | filter : vm.searchText '></jobdetail></ul>"
      };
    })

    .directive('jobdetail', function ($compile) {
      return {
        restrict: "E",
        replace: true,
        scope: true,
        templateUrl: "app/posts/list/list.template.html",
        link: function (scope, element, attrs) {
          if (angular.isArray(scope.job.children)) {
            element.append("<joblist joblist='job.children'></joblist>");
            $compile(element.contents())(scope);
          }
        }
      };
    });

}());