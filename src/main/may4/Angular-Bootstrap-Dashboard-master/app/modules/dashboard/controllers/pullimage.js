
dashboard.controller("PullImageController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;
	$scope.local = false;
	$scope.docker = false;
	$scope.pulldiv = false;
	$scope.pushdiv = false;
	$scope.importimg = "";
	$scope.registry = "";
	$scope.ocproj = "";
	$scope.proj = "";
	$scope.targetimg = "";
	$scope.img = "";
	$scope.fetcheddata = "";
	$scope.fetchedpulldata = "";
	$scope.results = false;
	$scope.pullresults = false;
    console.log("coming to imagepull controller");
	 $scope.localImage = function () {
		 console.log("inside local");
        $scope.local = true;
		$scope.docker = false;
    };
		$scope.close = function()
	{
		$scope.results = false;
		$scope.pullresults = false;
	}
	$scope.dockerImage = function () {
		console.log("inside docker");
        $scope.local = false;
		$scope.docker = true;
    };
	$scope.pullImage = function()
	{
		$scope.pulldiv = true;
		$scope.pushdiv = false;
	};
	$scope.pushImage = function()
	{
		$scope.pulldiv = false;
		$scope.pushdiv = true;
	};
	  vm.submitPullForm = function () {
		  console.log("inside pull"+$scope.importimg+$scope.registry+$scope.ocproj);
		  $http({
        method : "GET",
        url : 'http://localhost:8080/pullimg?importimg='+$scope.importimg+'&registry='+$scope.registry+'&ocproj='+$scope.ocproj
    }).then(function mySuccess(response) {
		$scope.pullresults = true;
		$scope.results = false;
        $scope.fetchedpulldata = response.data;
		//var jsontxt = JSON.stringify(response.data);
		console.log($scope.fetchedpulldata+"alerting success here");
    }, function myError(response) {
        $scope.fetchedpulldata = response.statusText;
		$scope.pullresults = true;
		$scope.results = false;
		console.log($scope.fetchedpulldata+"alerting error");
    });
		 
    };
	
		  vm.submitPushForm = function () {
		  $http({
        method : "GET",
        url : 'http://localhost:8080/pushimg?img='+$scope.img+'&proj='+$scope.proj+'&targetimg='+$scope.targetimg
    }).then(function mySuccess(response) {
		$scope.results = true;
		$scope.pullresults = false;
        $scope.fetcheddata = response.data;
		//var jsontxt = JSON.stringify(response.data);
		console.log($scope.fetcheddata+"alerting success here");
    }, function myError(response) {
        $scope.fetcheddata = response.statusText;
		$scope.results = true;
		$scope.pullresults = false;
		console.log($scope.fetcheddata+"alerting error");
    });
		 
    };
	
}]);

