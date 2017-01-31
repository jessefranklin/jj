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
      addPaymentToUser : function(oid,pid, data) {
        return $http.put('/api/addtoaccounting/'+oid+'/'+pid, data);
      },
      create : function(user) {
        return $http.post('/api/accounting', user);
      }
      
    };
  }

})();
