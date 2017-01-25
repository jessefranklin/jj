(function() {

  angular
    .module('app.profile')
    .factory('requestService', ['$http','$q','requestRestService','setuserService','$location','$document', requestService]);

  requestService.$inject = ['$http','$q','requestRestService','setuserService','$location','$document'];
  function requestService ($http,$q,requestRestService,setuserService,$location,$document) {
    var vm = this;
    var requestData = [];
    vm.submitted = false;

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
          active: false,
          provider_date:request.provider_date,
          provider_time:request.provider_time,
          original_cost:job.cost.total_amount,
          bid:request.bid
      };

      vm.requestArray = {
        request_id:job._id,
        title:job.title,
        status:'pending'
      };

      vm.user = user;
      requestData.push(vm.request);

      //FIX FOR MODAL
      angular.element($document[0].getElementsByClassName('modal-backdrop')).remove();
      angular.element(document.body).removeClass('modal-open');

      $location.path('/request');
    };

    submitRequest = function(){
      vm.request.active = true;
      requestRestService.create(vm.request)
        .then(function(data){
          setuserService.addToUser(vm.user,vm.requestArray,'requests');
          var applicant = {
            applicant_id: vm.request.provider_id,
            request_id: data.data._id,
            status: 'pending'
          };
          requestRestService.addToJob(vm.request.job_id,applicant);
          vm.submitted = true;
        });
    };

    getRequest = function(){
        return requestData;
    };

    return {
      createRequest: createRequest,
      submitRequest: submitRequest,
      getRequest: getRequest,
      close: close
    };

  }

})();