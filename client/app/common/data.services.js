(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http','$q', jobsService])
    .factory('myservice',['$http','$q', myservice]);

  jobsService.$inject = ['$http','$q'];

  function jobsService ($http,$q) {
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

  function myservice(){
    var myjsonObj = null;
    return {
      getJson:function(){
        return myjsonObj;
      },
      setJson:function(value){
        myjsonObj = value;
      }
    };
  }


})();