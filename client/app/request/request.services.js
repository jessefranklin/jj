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
        job_id:job._id,
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
          vm.requestArray.request_id = data.data._id;
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

    getRequestsByOwner = function(id){
      return requestRestService.getOwnerRequests(id);
    };

    updateRequest = function(id, data){
      requestRestService.update(id,data)
        .then(function(data){
            console.log('request updated');
            console.log(data);
        });
    };

    getPostRequests = function(job_id){
      requestRestService.getPostRequests(job_id)
        .then(function(data){
          console.log(data);
          return data;
      });
    };

    deleteAll = function(j_id){
      console.log(j_id);
      requestRestService.deleteAll(j_id)
        .then(function(data){
          console.log(data);
      });
    };

    deleteRequest = function(job_id,req_id,data){
      requestRestService.delete(req_id)
        .then(function(data){
          console.log(data);
      });
      requestRestService.removeFromJob(job_id,data)
        .then(function(data){
          console.log(data);
      });
    };


    return {
      createRequest: createRequest,
      submitRequest: submitRequest,
      getRequest: getRequest,
      getRequestsByOwner: getRequestsByOwner,
      getPostRequests: getPostRequests,
      close: close,
      updateRequest: updateRequest,
      deleteRequest: deleteRequest,
      deleteAll: deleteAll
    };

  }

})();