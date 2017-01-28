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
      removeFromUser : function(id,type,data) {
        return $http.put('/api/removefromuser/' + id +'/'+type,data);
      },
      addToUser : function(id,type, data) {
        return $http.put('/api/addtouser/'+id+'/'+type, data);
      },
      create : function(user) {
        return $http.post('/api/user', user);
      },
      delete : function(id) {
        return $http.delete('/api/user/' + id);
      },
      createStripeUser : function(token) {
        return $http.post('/api/payment/', token);
      },
      processPayment : function(obj) {
        return $http.post('/api/processpayment/', obj);
      }
      
    };
  }

})();
