

dashboard.controller("CiCdController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;
	$scope.proj = "";
	$scope.filepath = "";
	$scope.fetcheddata = false;
	$scope.close = function()
	{
		$scope.results = false;
	}
    vm.submitForm = function () {
       $http({
        method : "GET",
        url : 'http://localhost:8080/cicd?filepath='+$scope.filepath+'&proj='+$scope.proj
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
    console.log("coming to CICD controller");
}]);

