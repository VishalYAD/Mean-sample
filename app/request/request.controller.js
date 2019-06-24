(function () {
    'use strict';

    angular
        .module('app')
        .controller('Request.IndexController', Controller);

    function Controller($window, UserService, FlashService,$scope) {
      var vm = this;
      if($scope.vmain.user.pos !=="user"){
        vm.show = "den";
        alert('Access Denied');
                $window.location = '/';
      }
      
      vm.user = null;
      vm.saveUserreq = saveUserreq;
      vm.user = {dt: Date.now(),stats: 'Pending',retur: 'No',deliv: 'No',uname: $scope.vmain.user.username,stats: {
        "head" : "Pending",
        "gate" : "Pending",
        "costt" : "Pending"
}};
      vm.taxes = [{name: 'first'}, {name: 'second'}, {name: 'third'}];
      vm.myDate = new Date();
      vm.minDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() ,
        vm.myDate.getDate());
      vm.natures = [{name: 'Research'},{name: 'Repair'},{name: 'Rework'},{name:'Testing Evaluation'},
      {name: 'Inspection'},{name: 'Other'}];
      
      vm.depts = [{name: 'Cost Control'}, {name: 'Finance & Accounts'},{name: 'HR & GA'},
      {name: 'Information Technology'},{name: 'JSAI Banglore'},{name: 'JSAI chennai'},
      {name: 'Manufacturing Engineering'},{name: 'Production'},{name: 'Production Control'},
      {name: 'Production Design'},{name: 'Purchase Department'},{name: 'Quality Control'},
      {name: 'Quality System'},{name: 'Sales and Marketing'}];

      vm.vnames = [{name: 'one'}, {name: 'two'}, {name: 'three'}, {name: 'four'}, {name: 'five'}];
      
      vm.currs = [{name: 'INR'},{name: 'JPY'},{name: 'USD'}];
      vm.date = Date.now();
      vm.Getvendor = function() {
        var vendet = vm.user.vname1;
        console.log("In vendor",vendet);
        UserService.GetVen(vendet).then(function (vend) {
            vm.user.vcode = vend.vencode;
            vm.user.vname2 = vend.venname2;
            vm.user.cstnum = vend.vencst;
            vm.user.vemail = vend.venemail;
            vm.user.vadd =  vend.venadd;
            vm.user.currency = vend.vencurr;
            vm.user.egstnum = vend.venegst;
            vm.user.ebill = vend.veneway;
            vm.user.taxc = vend.ventax;
            vm.user.gstnum = vend.vengst
        });
    }
      function saveUserreq() {
        if (vm.userForm.$valid) {
            UserService.Createreq(vm.user)
            .then(function () {
                alert('Successfully submitted.. ')
                $window.location = '/';
            })
            .catch(function (error) {
                $window.scrollTo(0, 0);
                FlashService.Error(error);
            });
          }
           else {
            alert('Form was invalid!');
           
          } 
      
        
        
          
    }
         
    }

})();