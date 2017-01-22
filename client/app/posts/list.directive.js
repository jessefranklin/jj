(function () {

  angular
    .module('app.post')
    .directive('joblist', function () {
      return {
        restrict: "E",
        replace: true,
        scope: {
          jobs: '=',
          searchtext:'='
        },
        template: "<ul><jobdetail ng-repeat='job in jobs|filter:searchtext' job='job'></jobdetail></ul>"
      };
    })

    .directive('jobdetail', function ($compile) {
      return {
        restrict: "E",
        replace: true,
        scope: {
          job: '='
        },
        templateUrl: "app/posts/list.template.html",
        link: function (scope, element, attrs) {
          if (angular.isArray(scope.job.children)) {
            element.append("<joblist joblist='job.children'></joblist>");
            $compile(element.contents())(scope);
          }
        }
      };
    });

}());