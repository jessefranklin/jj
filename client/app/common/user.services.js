(function() {

  angular
    .module('app.profile')
    .factory('userService', ['$http','$q', userService]);

  userService.$inject = ['$http','$q'];
  function userService ($http,$q) {
    return {
      get : function() {
        return $http.get('/api/user');
      },
      getById : function(id) {
        return $http.get('/api/user/' + id);
      },
      update : function(id, user) {
        return $http.put('/api/user/' + id, user);
      },
      updateJobs : function(id, job_id) {
        return $http.put('/api/userjobs/' + id, job_id);
      },
      create : function(user) {
        return $http.post('/api/user', user);
      },
      delete : function(id) {
        return $http.delete('/api/user/' + id);
      }
    };
  }

})();
