
dashboard.controller("ContactController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;

    vm.message = {};
$scope.git = "";
$scope.baseimg = "";
$scope.projname = "";
$scope.imgname = "";
$scope.results = false;
$scope.fetcheddata = "";

    vm.submitForm = function () {
		console.log($scope.git+$scope.baseimg+$scope.projname+$scope.imgname);
       $http({
        method : "GET",
        url : 'http://localhost:8080/dockerimg?git='+$scope.git+'&baseimg='+$scope.baseimg+'&imgname='+$scope.imgname
    }).then(function mySuccess(response) {
		$scope.results = true;
        $scope.fetcheddata = response.data;
		console.log($scope.fetcheddata+"alerting success");
    }, function myError(response) {
        $scope.fetcheddata = response.statusText;
		$scope.results = true;
		console.log($scope.fetcheddata+"alerting error");
    });
    }; 
    console.log("coming to Contact controller");
}]);

