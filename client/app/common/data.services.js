(function() {

  angular
    .module('app')
    .factory('jobsService', ['$http','$q', jobsService])
    .factory('requestService', ['$http','$q', requestService])
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