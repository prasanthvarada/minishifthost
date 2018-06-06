/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Contact page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("ByStoreController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;
var myVar;
$scope.proj = "";
$scope.app = "";
$scope.type = "";
$scope.git = "";
$scope.fetcheddata ="";
$scope.results = false;
    vm.message = {};
$scope.browse = false;
$scope.loader = false;
/* 	
	if($scope.deployAs=="GIT")
	{
		console.log("Deploy As:"+$scope.deployAs+"inside git");
	}
	else
	{
		console.log("Deploy As:"+$scope.deployAs+"inside war");
	} */
	$scope.report = function()
	{
		if($scope.type=="WAR")
	{
		$scope.browse = true;
	}
	else
	{
		$scope.browse = false;
	}
		
	}
	$scope.close = function()
	{
		$scope.loader = false;
		$scope.results = false;
		document.getElementById("myDiv").style.display = "none";
	}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
    vm.submitForm = function () {
        /* $scope.loader = true;
		 myVar = setTimeout(showPage, 3000); */
		 
		 $http({
        method : "GET",
        url : 'http://localhost:8080/hostapp?proj='+$scope.proj+'&app='+$scope.app+'&type='+$scope.type+'&git='+$scope.git
    }).then(function mySuccess(response) {
		$scope.results = true;
        $scope.fetcheddata = response.data;
		//var jsontxt = JSON.stringify(response.data);
		console.log($scope.fetcheddata+"alerting success here");
    }, function myError(response) {
        $scope.fetcheddata = response.statusText;
		$scope.results = true;
		console.log($scope.fetcheddata+"alerting error");
    });
		 
    };
    console.log("coming to Contact controller");
}]);

