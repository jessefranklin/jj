(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http', '$q', '$angularCacheFactory', jobsService]);

  jobsService.$inject = ['$http', '$q', '$angularCacheFactory'];

  function jobsService ($http, $q, $angularCacheFactory) {
    var service = {
      allJobs: allJobs
    };

    return service;

    function allJobs() {
      var deferred = $q.defer(),
      start = new Date().getTime();

      $http.get('http://localhost:3010/jobs/')
        .success(function(data) {
          console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
          deferred.resolve(data);
        })
        .error(function(data, status){
          deferred.reject({
            'status': status,
            'data': data
        });
      });

      return deferred.promise;
    }


  }

})();