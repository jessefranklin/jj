(function() {

  angular
    .module('app.profile')
    .factory('ratingService', ['$http','$q', ratingService]);

  ratingService.$inject = ['$http','$q'];
  function ratingService ($http,$q) {
    return {
      getById : function(id) {
        return $http.get('/api/rating/' + id);
      },
      addRatingToUser : function(id,type, data) {
        return $http.put('/api/addtorating/'+id+'/'+type, data);
      },
      create : function(user) {
        return $http.post('/api/rating', user);
      }
      
    };
  }

})();
