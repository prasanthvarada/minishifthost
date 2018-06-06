/*==========================================================
   Author      : Ranjithprabhu K
   Date Created: 05 Jan 2016
   Description : To handle the service for Dashboard module
   
   Change Log
   s.no      date    author     description     
===========================================================*/


dashboard.service('dashboardService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var dashboardService = {};


    //service to communicate with users model to verify login credentials
    var accessLogin = function (parameters) {
        var deferred = $q.defer();
        apiService.get("users", parameters).then(function (response) {
            if (response)
                deferred.resolve(response);
            else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    //service to communicate with users to include a new user
    var registerUser = function (parameters) {
        var deferred = $q.defer();
        apiService.create("users", parameters).then(function (response) {
            if (response)
                deferred.resolve(response);
            else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    dashboardService.accessLogin = accessLogin;
    dashboardService.registerUser = registerUser;

    return dashboardService;

}]);

dashboard.service('sharedProperties', function () {
        var dept_num = 0;
		var groups = 0;
		var page = 0;

        return {
            getProperty: function () {
                return [dept_num,groups,page];
            },
            setProperty: function(value1,value2,value3) {
                dept_num = value1;
				groups = value2;
				page = value3;
            }
        };
    });
