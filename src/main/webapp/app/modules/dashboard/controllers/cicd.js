

dashboard.controller("CiCdController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
    var vm = this;
	$scope.proj = "";
	$scope.filepath = "";
	var fileName = "";
	$scope.fetcheddata = "";
	$scope.close = function()
	{
		document.getElementById("myModal").style.display = "none";
	}
		
	$scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
			$scope.filepath = $scope.theFile.name;
        });
    };

    vm.submitForm = function () {
       $http({
        method : "GET",
        url : 'http://localhost:8080/cicd?filepath='+$scope.filepath+'&proj='+$scope.proj
    }).then(function mySuccess(response) {
		console.log(response.data);
		 $http.get('../logs/'+response.data).success(function (data) {
            $scope.fetcheddata = data;
  document.getElementById("myModal").style.display = "block";
        });
    }, 
	function myError(response) {
        $scope.fetcheddata = response.statusText;
		console.log($scope.fetcheddata+"alerting error");
    });
    };
    console.log("coming to CICD controller");
}]);

