(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http','$q', jobsService]);

  jobsService.$inject = ['$http','$q'];

  function jobsService ($http,$q) {
    return {
      get : function() {
        return $http.get('/api/jobs');
      },
      getById : function(id) {
        return $http.get('/api/jobs/' + id);
      },
      update : function(id) {
        return $http.put('/api/jobs/' + id, job);
      },
      create : function(job) {
        return $http.post('/api/jobs', job);
      },
      delete : function(id) {
        return $http.delete('/api/jobs/' + id);
      }
    };
  }
})();