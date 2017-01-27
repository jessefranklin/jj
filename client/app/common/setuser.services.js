(function() {

  angular
    .module('app.profile')
    .factory('setuserService', ['$http','$q','userService','ratingService', setuserService]);

  setuserService.$inject = ['$http','$q','userService','ratingService'];
  function setuserService ($http,$q,userService,ratingService) {
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
        userService.getById(userProfile)
          .then(function(data) {
            
          });
      },

      createUser=function(userData,type){
        vm.user_data = {
          user_id: vm.userProfile.user_id,
          name: vm.userProfile.name,
          email: vm.userProfile.email || null,
          picture: vm.userProfile.picture,
          role: 'employer',
          status: 'active'
        };
        vm.user_data[type] = userData;
        vm.rating = {
          vendor_rating_avg: 0,
          vendor_rating:[],
          provider_rating_avg: 0,
          provider_rating: []
        };
        userService.create(vm.user_data)
          .then(function(data) {
              console.log(data);
              console.log('user created');
              vm.rating.user_id = data.data._id;
              console.log(vm.rating);
              ratingService.create(vm.rating)
                .then(function(data) {
                  console.log('rating obj created');
                });
          });
      },

      updateUser=function(user_id,userData,type){
        userService.addToUser(user_id,type,userData)
          .then(function(data) {
              console.log('update user');
          });
      },

      updateRating=function(user_id,userData,type){
        ratingService.addRatingToUser(user_id,type,userData)
          .then(function(data) {
              console.log('update user');
          });
      },

      deleteJobFromUser=function(user_id,type,data){
        userService.removeFromUser(user_id,type,data)
          .then(function(data) {
              console.log(data);
          });
      };

      return {
        addToUser: addToUser,
        createUser: createUser,
        updateUser: updateUser,
        getUser: getUser,
        deleteJobFromUser: deleteJobFromUser
      };

  }

})();