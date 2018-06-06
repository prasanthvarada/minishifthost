dashboard.controller("SearchResultsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'sharedProperties',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, sharedProperties) {
   console.log("inside search results");
   var shareddata = sharedProperties.getProperty();
   var otsadjcal;var invtplndend;var newotsadj;var neworigots;var newopen;var newid;var mes;
 
    $scope.check = false;$scope.DIV_NUM = "";$scope.DEPT_NUM = shareddata[0];$scope.GROUPS = shareddata[1];$scope.PAGE = shareddata[2];$scope.TRANSITIONAL = "" ;$scope.STR_NUM = "" ;$scope.DC_NUM = "" ;$scope.INV_LAST = "" ;$scope.INV_THIS = "" ;$scope.INV_PLANNED = "" ;$scope.SALES_LAST = "" ;$scope.SALES_THIS = "" ;$scope.SALES_PLANNED = "" ;$scope.STORE_TRAN_QTY = "" ;$scope.INV_2_AGO = "" ;$scope.SALES_2_AGO = "" ;$scope.SALES_PLANNED_WEEK2 = "" ;$scope.SALES_PLAN_PERIOD_END = "" ;$scope.OTS_WEEKS = "" ;$scope.DIST_LAST_REG = "" ;$scope.DIST_LAST_AD = "" ;$scope.DIST_WTD_REG = "" ;$scope.DIST_WTD_AD = "" ;$scope.divnum = "" ;$scope.otsadj = "" ;$scope.invtplnd = "" ;$scope.invtplndend = "" ;$scope.dcnum = "" ;$scope.strnum = "" ;$scope.catgnumone = "" ;$scope.catgnumtwo = "" ;$scope.catgnumthree = "" ;$scope.catgnumfour = "" ;$scope.catgnumfive = "" ;$scope.plandesc = "";$scope.origpct = "";$scope.origots = "";$scope.itemSelected="";$scope.WHSEdiv = false;$scope.STRdiv = false;$scope.SSdiv=false;$scope.TOdiv=false;$scope.FROMdiv=false;$scope.OTSRANGEdiv=false;$scope.SORTdiv=false;$scope.ZONEdiv=false;$scope.ALRDYdiv=false;$scope.CHLSTdiv=false;$scope.ATTRdiv=false;$scope.ALLdiv=false;
	
	$scope.predicate = 'lwsales';
  
  $scope.sort = function(predicate) {
    $scope.predicate = predicate;
  }
  
  $scope.isSorted = function(predicate) {
    return ($scope.predicate == predicate)
  }

  $scope.onCategoryChange = function() {
		if('WHSE'==$scope.itemSelected)
		{
			$scope.WHSEdiv=true;
		}
		if('STR'==$scope.itemSelected)
		{
			$scope.STRdiv=true;
		}
		if('ATTR LIST'==$scope.itemSelected)
		{
			$scope.ATTRdiv=true;
		}
		if('CHLST'==$scope.itemSelected)
		{
			$scope.CHLSTdiv=true;
		}
		if('ALRDY ADJ'==$scope.itemSelected)
		{
			$scope.ALRDYdiv=true;
		}
		if('ZONE'==$scope.itemSelected)
		{
			$scope.ZONEdiv=true;
		}
		if('SORT'==$scope.itemSelected)
		{
			$scope.SORTdiv=true;
		}
		if('OTS RANGE'==$scope.itemSelected)
		{
			$scope.OTSRANGEdiv=true;
		}
		if('FROM'==$scope.itemSelected)
		{
			$scope.FROMdiv=true;
		}
		if('TO'==$scope.itemSelected)
		{
			$scope.TOdiv=true;
		}
		if('S/S'==$scope.itemSelected)
		{
			$scope.SSdiv=true;
		}
		if('ALL'==$scope.itemSelected)
		{
			$scope.ALLdiv=true;
		}
    };
		$scope.submitMyForm = function () {
      console.log("inside form submit");
        var res = $http.post('http://127.0.0.1:3000/singledata', {"dept" :$scope.DEPT_NUM,"group" :$scope.GROUPS,"page" :$scope.PAGE,"dcnum":$scope.dcnum,"strnum":$scope.strnum});
		res.success(function(data, status, headers, config) {
			$scope.fetcheddata = data;
					angular.forEach($scope.fetcheddata,function(value,index){
                $scope.catgnumone = value.catgnumone;
				$scope.catgnumtwo = value.catgnumtwo;
				$scope.catgnumthree = value.catgnumthree;
				$scope.catgnumfour = value.catgnumfour;
				$scope.catgnumfive = value.catgnumfive;
				$scope.plandesc = value.plandesc;
            });
			console.log($scope.fetcheddata+"$scope.fetcheddata");
			if($scope.fetcheddata!= null)
		{
			$scope.check = true;
		}
		
		});
		res.error(function(data, status, headers, config) {
			$scope.fetcheddata = data;
			console.log($scope.fetcheddata+"$scope.fetcheddata error");
			if($scope.fetcheddata!= null)
		{
			$scope.check = true;
		}
		});

console.log("inside state change");
    };
	$scope.enabledEdit =[];
	$scope.editEmployee = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	
	$scope.deleteEmployee = function(index) {
		  $scope.empoyees.splice(index,1);
	}
	$scope.updateOTS = function(mes) {
		newid = mes.id;
		mes = mes;
		var rescal = $http.post("http://localhost:3000/datacal",{"id":mes.id});
        rescal.success(function(data,status,headers,config)
		{
			var fetcheddatacal = data;
			angular.forEach(fetcheddatacal, function(itemcal){
            otsadjcal = itemcal.otsadj;
			invtplndend = itemcal.invtplndend;  
			newotsadj = mes.otsadj-otsadjcal;
            neworigots = itemcal.origots+newotsadj;
		    newopen = (neworigots/invtplndend)*100;
			mes.origpct = Math.round(newopen);
			mes.origots = neworigots;
               }) 
			    
		var res = $http.post('http://127.0.0.1:3000/updateOTS', {"otsadj" :mes.otsadj,"origots":neworigots,"origpct":mes.origpct,"id" :mes.id});
		res.success(function(data, status, headers, config) {
			$scope.fetcheddata1 = data;
			alert("updated successfully");
		});
		res.error(function(data, status, headers, config) {
			$scope.fetcheddata1 = data;
			alert("error");
		});
		});
		
		
	}
}]);

