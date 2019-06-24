(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
        .config(config)
        .run(run)
        .controller('MAINCTRL',function(UserService){
            var vm = this;

            vm.user = null;
    
            initController();
    
            function initController() {
                // get current user
                UserService.GetCurrent2().then(function (user) {
                    vm.user = user;
                    console.log("user: ",user);
                });
            }
        });

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('request', {
                url: '/request',
                templateUrl: 'request/index.html',
                controller: 'Request.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'request' }
            })
            .state('show',{
                url: '/show',
                templateUrl: 'show/index.html',
                controller: 'Show.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'show'}
            })
            .state('rejected',{
                url: '/rejected',
                templateUrl: 'rejected/index.html',
                controller: 'Rejected.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'rejected'}
            })
            .state('hrequest',{
                url: '/hrequest',
                templateUrl: 'hrequest/index.html',
                controller: 'Hrequest.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'hrequest'}
            })
            .state('returned',{
                url: '/returned',
                templateUrl: 'returned/index.html',
                controller: 'Returned.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'returned'}
            })
            .state('notreturned',{
                url: '/notreturned',
                templateUrl: 'notreturned/index.html',
                controller: 'NOTReturned.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'notreturned'}
            })
            .state('pending',{
                url: '/pending',
                templateUrl: 'pending/index.html',
                controller: 'Pending.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'pending'}
            })
            .state('approved',{
                url: '/approved',
                templateUrl: 'approved/index.html',
                controller: 'Approved.IndexController',
                controllerAs: 'vm',
                data: { activeTab:'approved'}
            });
    }

    function run($http, $rootScope, $window, $templateCache) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
       
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();