(function() {

  angular
    .module('app.post')
    .factory('jobsService', ['$http','$q', jobsService]);

  jobsService.$inject = ['$http','$q'];

  function jobsService ($http,$q) {
  var deferred = $q.defer();
    return {
      get : function() {
        return $http.get('/api/jobs');
      },
      getById : function(id) {
        return $http.get('/api/jobs/' + id);
      },
      getAllByOwner : function(id) {
        return $http.get('/api/myjobs/' + id);
      },
      update : function(id, job) {
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