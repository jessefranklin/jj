(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http', '$q', 'globalConfig', jobsService]);

  jobsService.$inject = ['$http', '$q', 'globalConfig'];

  function jobsService ($http, $q, globalConfig) {
    var service = {
      allJobs: allJobs
    };

    return service;

    function allJobs() {
      var deferred = $q.defer(),
      start = new Date().getTime();

      $http.get(globalConfig.devPath.dev+'jobs/')
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