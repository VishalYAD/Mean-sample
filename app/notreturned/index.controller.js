(function () {
    'use strict';

    angular
        .module('app')
        .controller('NOTReturned.IndexController', Controller);

    function Controller($window, UserService, FlashService,$mdDialog, $scope) {
      var vm = this;
      if($scope.vmain.user.pos == "cost"){
        vm.show = "den";
        alert('Access Denied');
                $window.location = '/';
      }
      vm.user2 = null;
      vm.app = {};
      vm.org = { first: 0,sort:"dt",stats : "Approved",retur : "No",deliv : "Yes",pos: $scope.vmain.user.pos,dept: $scope.vmain.user.dept};
       initController();
      
       function initController() {
           // get current user
               UserService.GetAllreq(vm.org).then(function (user) {
                vm.user = user;
            });
         
       } 
       vm.shownext = function(){ 
        vm.org.first = vm.org.first + 5;
        UserService.GetAllreq(vm.org).then(function (user) {
          console.log("Next: ",vm.user);
          if(user==""){
            alert('No more item');
           vm.org.first = vm.org.first - 5;
           UserService.GetAllreq(vm.org).then(function (user) {
            vm.user = user;
           });
            
          }
          else{
           vm.user = user;
          }
        
     });
       }
       vm.showprev = function(){ 
        vm.org.first = vm.org.first - 5;
        UserService.GetAllreq(vm.org).then(function (user) {
         vm.user = user;
     });
      }
      vm.Changed = function(){ 
        vm.org.first = 0;
        UserService.GetAllreq(vm.org).then(function (user) {
         vm.user = user;
     });
      }
      vm.approv = function(index,item) {
        vm.app.rname = item.rname;
        vm.app.dt = item.dt;
        vm.app.uname = item.uname;
        vm.app.pos = $scope.vmain.user.pos;
        vm.app.con = "Approved";
        vm.app.ret = "Yes";
          UserService.Updatereq(vm.app)
              .then(function () {
                alert('Approved')
                vm.user.splice(index, 1);
              })
              .catch(function (error) {
                alert(error);
              });
               
      }
      vm.myFunc = function(){ 
        if(vm.org.third >= 1)
        { vm.org.first = (vm.org.third - 1 )*5; 
        UserService.GetAllreq(vm.org).then(function (user) {
         vm.user = user;
     });
    }
      }
      
      
       vm.showAdvanced = function(nat) {
        vm.user2 = nat;
     $mdDialog.show({
       controller: DialogController,
       templateUrl: 'approved/item.html',
       parent: angular.element(document.body),
       clickOutsideToClose:true,
       fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
     })
     .then( function()
     {
       vm.status = 'You cancelled the dialog.';
     });
   };
 function DialogController($scope, $mdDialog) {
     $scope.idetail = vm.user2; 
     $scope.hide = function() {
       $mdDialog.hide();
     };
 
     $scope.cancel = function() {
       $mdDialog.cancel();
     };
 
     $scope.answer = function() {
       $mdDialog.hide();
     };
   }

    }

})();