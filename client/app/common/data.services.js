(function() {

  angular
    .module('app')
    .factory('myservice',['$http','$q', myservice]);

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