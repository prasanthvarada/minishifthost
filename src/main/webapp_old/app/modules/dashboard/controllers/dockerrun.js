

dashboard.controller("DockerRunController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;
	$scope.img = "";
	$scope.results = false;
	$scope.fetcheddata = "";
    vm.submitForm = function () {
       $http({
        method : "GET",
        url : 'http://localhost:8080/dockerrun?img='+$scope.img
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

