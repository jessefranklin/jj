(function() {

  angular
    .module('app.communication')
    .factory('requestService', ['$http','$q', requestService]);

  requestService.$inject = ['$http','$q'];
  function requestService ($http,$q) {
    return {
      get : function() {
        return $http.get('/api/request');
      },
      getById : function(id) {
        return $http.get('/api/request/' + id);
      },
      update : function(id, request) {
        return $http.put('/api/request/' + id, request);
      },
      create : function(request) {
        return $http.post('/api/request', request);
      },
      delete : function(id) {
        return $http.delete('/api/request/' + id);
      }
    };
  }

})();