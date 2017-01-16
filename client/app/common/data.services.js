(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http', jobsService]);

  jobsService.$inject = ['$http'];

  function jobsService ($http) {
    return {
      get : function() {
        return $http.get('/api/jobs');
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