(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetCurrent2 = GetCurrent2;
        service.GetAll = GetAll;
        service.GetAllreq = GetAllreq;
        service.GetById = GetById;
        service.GetVen = GetVen;
        service.Gethomereq = Gethomereq;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Updatereq = Updatereq;
        service.Delete = Delete;
        service.Createreq = Createreq;
        return service;

        function GetCurrent(det) {
            return $http.get('/api/users/current/'+ det.pos + '/' + det.dept).then(handleSuccess, handleError);
        }
        function Gethomereq(det) {
            return $http.get('/api/users/currenthome/'+ det.pos + '/' + det.dept).then(handleSuccess, handleError);
        }
        
        function GetCurrent2() {
            return $http.get('/api/users/current2').then(handleSuccess, handleError);
        }
        function GetVen(vendet) {
            return $http.get('/api/users/vend/'+ vendet).then(handleSuccess, handleError);
        }
        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError);
        }

        function GetAllreq(org) {
            console.log('User service: ',org.stats)
            return $http.get('/api/users/'+ org.first + '/'+ org.sort + '/'+ org.stats +'/'+ org.deliv +'/'+ org.retur +'/'+ org.pos +'/'+ org.dept).then(handleSuccess, handleError);
        }
        function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }
        function Updatereq(user) {
            return $http.post('/api/users/upreq', user).then(handleSuccess, handleError);
        }
        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }
        function Createreq(user) {
            return $http.post('/api/users/request', user).then(handleSuccess, handleError);
        }
        // private functions
        /**
         * function Updatestat(user) {
            return $http.put('/api/users/updatestat', user).then(handleSuccess, handleError);
        }
         * @param {*} user 
         */
        
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
