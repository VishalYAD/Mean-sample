(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, $window,$scope) {
        var vm = this;
        vm.det = {};
        vm.user = null;
        vm.user2 = null;
        initController();
        function initController() {
            // get current user
            vm.det.pos = $scope.vmain.user.pos;
            vm.det.dept = $scope.vmain.user.dept;
            UserService.GetCurrent(vm.det).then(function (user) {
                vm.user = user;
            });
            UserService.Gethomereq(vm.det).then(function (user2) {
                vm.user2 = user2;
                console.log(user2);
            });
        }
    }

})();