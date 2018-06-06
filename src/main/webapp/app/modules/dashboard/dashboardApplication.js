/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Base for Dashboard Application module
    
    Change Log
    s.no      date    author     description     
    

 ===========================================================*/

var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);

dashboard.config(["$stateProvider", function ($stateProvider) {

  $stateProvider.state('app.home', {
        url: '/CreateDeploy',
        templateUrl: 'app/modules/dashboard/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Home'
        }
    });

    //Contact page state
    $stateProvider.state('app.CreatePublish', {
        url: '/CreatePublish',
        templateUrl: 'app/modules/dashboard/views/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Create/Publish'
        }
    });

    //Search page state
    $stateProvider.state('app.search', {
        url: '/search',
        templateUrl: 'app/modules/dashboard/views/search.html',
        controller: 'appCtrl',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Search'
        }
    });
	
	$stateProvider.state('app.pullimage', {
        url: '/pullimage',
        templateUrl: 'app/modules/dashboard/views/pullimage.html',
        controller: 'PullImageController', 
        controllerAs: 'vm',
        data: {
            pageTitle: 'pullimage'
        }
    });
	
	    $stateProvider.state('app.cdApp', {
        url: '/cdApp',
        templateUrl: 'app/modules/dashboard/views/bystore.html',
        controller: 'ByStoreController', 
        controllerAs: 'vm',
        data: {
            pageTitle: 'By Store'
        }
    });
	
	 $stateProvider.state('app.searchresults', {
        url: '/searchresults',
        templateUrl: 'app/modules/dashboard/views/searchresults.html',
        controller: 'SearchResultsController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Search Results'
        }
    });
	
	$stateProvider.state('app.cicd', {
        url: '/CICD',
        templateUrl: 'app/modules/dashboard/views/cicd.html',
        controller: 'CiCdController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'CICD'
        }
    });
	
		$stateProvider.state('app.dockerrun', {
        url: '/dockerrun',
        templateUrl: 'app/modules/dashboard/views/dockerrun.html',
        controller: 'DockerRunController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'CICD'
        }
    });
	
}]);

dashboard.directive('fdInput', [function () {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
				console.log(attrs+"printing files");
            });
        }
    }
}]);

