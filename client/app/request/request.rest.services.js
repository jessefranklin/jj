(function() {

  angular
    .module('app.request')
    .factory('requestRestService', ['$http','$q', requestRestService]);

  requestRestService.$inject = ['$http','$q'];
  function requestRestService ($http,$q) {
    return {
      get : function() {
        return $http.get('/api/request');
      },
      getById : function(id) {
        return $http.get('/api/request/' + id);
      },
      getPostRequests : function(id) {
        return $http.get('/api/getpostrequests/' + id);
      },
      getOwnerRequests : function(id) {
        return $http.get('/api/getreqbyowner/' + id);
      },
      update : function(id, request) {
        return $http.put('/api/request/' + id, request);
      },
      updateRequest : function(id, request) {
        return $http.put('/api/requestupdate/' + id, request);
      },
      create : function(request) {
        return $http.post('/api/request', request);
      },
      delete : function(id) {
        return $http.delete('/api/request/' + id);
      },
      deleteAll : function(j_id) {
        return $http.put('/api/requestdelete/', j_id);
      },
      addToJob : function(id, applicant) {
        return $http.put('/api/jobapply/' + id, applicant);
      },
      removeFromJob : function(id,applicant) {
        return $http.put('/api/jobremove/'+id, applicant);
      }
    };
  }

})();