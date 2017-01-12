
(function( angular ) {
    'use strict';
    
    angular.module("app")
        .config(['$stateProvider', '$urlRouterProvider', configureStates]);

    function configureStates($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app',
            {
                url: '',
                views: {
                    'header': {
                        templateUrl: 'app/shell/header.html'
                    },
                    'content': {
                        templateUrl: 'app/shell/home.html'
                    },
                    'footer': {
                        templateUrl: 'app/shell/footer.html'
                    }
                }
            })

            .state( 'app.home',
            {
                url : '/home',
                views : {
                    'content@' : {
                        templateUrl: 'app/shell/home.html'
                    }
                }
            })

            .state( 'app.manage',
            {
                url : '/manage',
                views : {
                    'content@' : {
                        templateUrl: 'app/shell/manage.html'
                    }
                }
            });
    }

}( this.angular ));
