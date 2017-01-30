(function() {

  angular
    .module('app.profile')
    .factory('accountingService', ['$http','$q', accountingService]);

  accountingService.$inject = ['$http','$q'];
  function accountingService ($http,$q) {
    return {
      getById : function(id) {
        return $http.get('/api/accounting/' + id);
      },
      addPaymentToUser : function(id,type, data) {
        return $http.put('/api/accounting/'+id+'/'+type, data);
      },
      create : function(user) {
        return $http.post('/api/accounting', user);
      }
      
    };
  }

})();
