(function () {

  angular
    .module('app.post')
    .controller('thanksCtrl',  ['$scope','$state','$location','$document',thanksController]);

  thanksController.$inject = ['$scope','$state','$location','$document'];

  function thanksController($scope,$state,$location,$document) {
    var vm = this;
    console.log($state.params.id);

    angular.element(document.querySelector('#paymentModal')).modal('hide');
  }

}());
