(function () {

  angular
    .module('app.post')
    .directive('joblist', function () {
      return {
        restrict: "E",
        replace: true,
        scope: {
          jobs: '=',
          searchtext:'=',
          manage: '='
        },
        template: "<ul><jobdetail ng-repeat='job in jobs | filter : searchtext' job='job' manage='manage'></jobdetail></ul>"
      };
    })

    .directive('jobdetail', function ($compile) {
      return {
        restrict: "E",
        replace: true,
        scope: {
          job: '=',
          manage: '='
        },
        controller: 'manageCtrl',
        controllerAs: 'vm',
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