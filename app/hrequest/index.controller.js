(function () {
    'use strict';

    angular
        .module('app')
        .controller('Hrequest.IndexController', Controller);

    function Controller($window, UserService, FlashService,$mdDialog, $scope) {
      var vm = this;
      vm.user2 = null;
      vm.org = { first: 0,sort:"dt",stats : "Pending",pos: $scope.vmain.user.pos,dept: $scope.vmain.user.dept};
      vm.org2 = null;
      vm.app = {};
       initController();
      
       function initController() {
           // get current user
               UserService.GetAllreq(vm.org).then(function (user) {
                vm.user = user;
                vm.org.forth = Object.keys(user).length;
                console.log(vm.org.forth);
            });
         
       } 
       vm.shownext = function(){ 
         vm.org.first = vm.org.first + 5;
         UserService.GetAllreq(vm.org).then(function (user) {
          vm.user = user;
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
        UserService.Updatereq(vm.app)
            .then(function () {
              alert('Approved')
              vm.user.splice(index, 1);
            })
            .catch(function (error) {
              alert(error);
            });
             
    }
    vm.rejec = function(index,item) {
      vm.app.rname = item.rname;
      vm.app.dt = item.dt;
      vm.app.uname = item.uname;
      vm.app.con = "Rejected";
      vm.app.pos = $scope.vmain.user.pos;
      UserService.Updatereq(vm.app)
          .then(function () {
            alert('Rejected')
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
      /**vm.updatest = function(updat){
        UserService.Updatestat(updat).then(function () {
          FlashService.Success('User updated');
      })
      .catch(function (error) {
          FlashService.Error(error);
      });
      } */
      
      
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