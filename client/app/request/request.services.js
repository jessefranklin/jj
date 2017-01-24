(function() {

  angular
    .module('app.profile')
    .factory('requestService', ['$http','$q','requestRestService','$location', requestService]);

  requestService.$inject = ['$http','$q','requestRestService','$location'];
  function requestService ($http,$q,requestRestService,$location) {
    var vm = this;
    vm.request = {};
    var requestData = [];

    createRequest=function(job,user,request){
      vm.request = {
          job_id: job._id,
          job_owner_id: job.owner,
          provider_id: user.user_id,
          provider_name: user.name,
          rating: null,
          status: 'pending',
          stage: 1,
          title: job.title,
          completed: false,
          archived: false,
          provider_date:request.provider_date,
          provider_time:request.provider_time,
          bid:request.bid
      };

      requestData.push(vm.request);
      dialog.close();
      requestRestService.create(vm.request)
        .then(function(data){
          $location.path('/request');
        });
    };

    getRequest = function(){
        return requestData;
    };

    return {
      createRequest: createRequest,
      getRequest: getRequest,
      close: close
    };

  }

})();