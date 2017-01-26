(function() {

  angular
    .module('app.profile')
    .factory('setuserService', ['$http','$q','userService', setuserService]);

  setuserService.$inject = ['$http','$q','userService'];
  function setuserService ($http,$q,userService) {
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
        userService.create(vm.user_data)
          .then(function(data) {
              console.log('user created');
          });
      },

      updateUser=function(user_id,userData,type){
        userService.addToUser(user_id,type,userData)
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