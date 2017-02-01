(function() {

  angular
    .module('app.profile')
    .factory('setuserService', ['$http','$q','userService','ratingService','accountingService', setuserService]);

  setuserService.$inject = ['$http','$q','userService','ratingService','accountingService'];
  function setuserService ($http,$q,userService,ratingService,accountingService) {
      var vm = this;
      vm.userProfile = {};

      var addToUser = function(userProfile,userData,type){
        vm.userProfile = userProfile;
        userService.getById(userProfile.user_id)
          .then(function(data) {
              if(data.data.length){
                vm.user_data = data.data;
                updateUser(userProfile.user_id,userData,type);
              } else {
                createUser(userData,type);
              }
          });
      },

      getUser = function(userProfile){
        var deferred = $q.defer();
        userService.getById(userProfile)
          .then(function(data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      },

      createUser=function(userData,type){
        console.log(type);
        vm.user_data = {
          user_id: vm.userProfile.user_id,
          name: vm.userProfile.name,
          email: vm.userProfile.email || null,
          picture: vm.userProfile.picture,
          role: 'employer',
          status: 'active',
          preferences: {
            jobs: type=='jobs'?true:false,
            requests: type=='requests'?true:false,
            profile: true
          }
        };
        
        vm.user_data[type] = userData;

        vm.rating = {
          vendor_rating_avg: 0,
          vendor_rating:[],
          provider_rating_avg: 0,
          provider_rating: []
        };

        vm.accounting = {
          user_id: vm.userProfile.user_id,
          balance: 0,
          total_earnings: 0,
          owed:[],
          earned:[]
        };
        userService.create(vm.user_data)
          .then(function(data) {
              vm.rating.user_id = data.data.user_id;
              ratingService.create(vm.rating)
                .then(function(data) {
                  console.log('rating model created');
                  accountingService.create(vm.accounting)
                    .then(function(data) {
                      console.log('accounting model created');

                      console.log(data);
                    });
                });
          });
      },

      updateUser=function(user_id,userData,type){
        userService.addToUser(user_id,type,userData)
          .then(function(data) {
              console.log('update user');
          });
      },

      update=function(user_id,userData){
        userService.update(user_id,userData)
          .then(function(data) {
              console.log('update user');
          });
      },

      updateRating=function(user_id,userData,type){
        ratingService.addRatingToUser(user_id,type,userData)
          .then(function(data) {
              console.log(data);
          });
      },

      deleteJobFromUser=function(user_id,type,data){
        userService.removeFromUser(user_id,type,data)
          .then(function(data) {
              console.log(data);
          });
      },

      createStripeUser = function(token, user_id){
        userService.createStripeUser(token)
          .then(function(data) {
              var userData = {
                s_customer_token: data.data.id
              };
              userService.update(user_id,userData);
          });
      },

      processPayment = function(payme){
        userService.processPayment(payme)
          .then(function(data) {
              console.log(data);
          });

      };

      return {
        createUser: createUser,
        getUser: getUser,
        updateUser: updateUser,
        update: update,
        addToUser: addToUser,
        deleteJobFromUser: deleteJobFromUser,
        updateRating: updateRating,
        createStripeUser: createStripeUser,
        processPayment:processPayment
      };

  }

})();