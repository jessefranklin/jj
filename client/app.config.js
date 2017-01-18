(function () {
  'use strict';

  angular
    .module('app')
      .value('globalConfig', {
        cache : {
          maxAge: 90000, // Items added to this cache expire after 15 minutes.
          cacheFlushInterval: 600000, // This cache will clear itself every hour.
          deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
        },
        persistentCache : {
          storageMode: 'localStorage' // This cache will sync itself with `localStorage`.
        },
        session : {
          inactivityTime: 20 * 60 * 1000
        },
        devPath : {
          dev : 'http://localhost:3010/',
          prod : 'http://localhost:3010/'
        }
      })
      .value('globalFunc', {
        uploadPath : 'http://localhost:3010/upload',
        categories : [{
          name:'labour'
        },{
          name:'movers'
        },{
          name:'drivers'
        }]
  });
})();
