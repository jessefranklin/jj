

(function() {
  'use strict';

  angular
    .module('app.request')
    .directive('starRating', starRating);

  function starRating() {
    return {
      restrict: 'EA',
      template:
		'<label for="rate-input" aria-label"Rate"></label>'+
		'<input class="form-control" ng-model="scope.rating" type="hidden" id="bid-input">'+
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' +
        '  </li>' +
        '</ul>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
        if (scope.max === undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        }
        scope.toggle = function(index) {
          if (scope.readonly === undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.rating = scope.ratingValue;
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  }
})();
