(function() {

  angular
    .module('app.profile')
    .factory('setuserService', ['$http','$q','userService', setuserService]);

  setuserService.$inject = ['$http','$q','userService'];
  function setuserService ($http,$q,userService) {
      var vm = this;
      vm.userProfile = {};

      var addToUser = function(userProfile,userData){
        vm.userProfile = userProfile;
        userService.getById(userProfile.user_id)
          .then(function(data) {
              if(data.data.length){
                vm.user_data = data.data;
                updateUser(userProfile.user_id,userData);
              } else {
                createUser(userData);
              }
          });
      },

      createUser=function(userData){
        vm.user_data = {
          user_id: vm.userProfile.user_id,
          name: vm.userProfile.name,
          email: vm.userProfile.email || null,
          picture: vm.userProfile.picture,
          role: 'employer',
          status: 'active',
        };
        vm.user_data.jobs = userData;
        userService.create(vm.user_data)
          .then(function(data) {
              console.log('user created');
          });
      },

      updateUser=function(user_id,userData){
        vm.user_data[0].jobs[vm.user_data[0].jobs.length]=userData;
        userService.update(user_id,vm.user_data[0])
          .then(function(data) {
              console.log('update user');
          });
      },

      deleteJob=function(user_id,userData){
        userService.updateJobs(user_id,userData)
          .then(function(data) {
              console.log(data);
          });
      };

      return {
        addToUser: addToUser,
        createUser: createUser,
        updateUser: updateUser,
        deleteJob: deleteJob
      };

  }

})();