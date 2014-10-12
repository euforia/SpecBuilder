
var appControllers = angular.module('appControllers', []);

appControllers.controller('defaultController', [ '$window', '$location', '$scope', 
	function($window, $location, $scope) {

		$scope.pageHeaderHtml = "/partials/page-header.html";

		$scope.logOut = function() {
	        
	        console.log("De-authing...");
	        var sStor = $window.sessionStorage;
	        if(sStor['credentials']) {
	            delete sStor['credentials'];
	        }

	        var lStor = $window.localStorage;
	        for(var k in lStor) {
	            if(/^token\-/.test(k)) delete lStor[k];
	        }

	        $location.url("/login");
	    }
	}
]);

appControllers.controller('loginController', [
	'$scope', '$window', '$routeParams', '$location',
	function($scope, $window, $routeParams, $location) {
		
		$scope.credentials = { username: "", password: "" };

		$scope.attemptLogin = function() {

		}

		function _initialize() {
			if($window.sessionStorage['credentials']) {

				var creds = JSON.parse($window.sessionStorage['credentials']);
				if(creds.username && creds.username !== "" && creds.password && creds.password !== "") {

					$scope.credentials = creds;
					$scope.attemptLogin();
				}
			}
		}

		_initialize();
	}
]);

appControllers.controller('packagerController', [
	'$scope', '$window', '$routeParams', '$location', 'PackageManager',
	function($scope, $window, $routeParams, $location, PackageManager) {

		$scope.searchQuery = "";
		$scope.searchResult = [];

		$scope.packageSearch = function() {
			PackageManager.search($scope.searchQuery, function(rslt) {

				$scope.searchResult = rslt;
			});
		}

	}
]);

appControllers.controller('specBuilderController', [
	'$scope', '$window', '$routeParams', '$location', 'PackageManager', 'LicenseManager', 'DownloadInitiator',
	function($scope, $window, $routeParams, $location, PackageManager, LicenseManager, DownloadInitiator) {
		"use strict";

		$scope.rpmSpecHtml = "partials/rpm-spec.html";

		$scope.spec = {};
		$scope.licenses = [];
		$scope.rpmGroups = {};

		function _initialize() {
			
			PackageManager.getSpecConfig("rhel", function(data) {
				
				if(data.error) console.error(data);
				else $scope.spec = data;
			});

			LicenseManager.listLicenses(function(data) {
				
				if(data.error) console.error(data);
				else $scope.licenses = data.licenses;
			});

			PackageManager.getRPMGroups(function(data) {
				
				if(data.error) console.error(data);
				else $scope.rpmGroups = data.groups;
			});
		}

		$scope.showPreview = function(elem) {
			$('#spec-editor').fadeOut();
			$('#spec-preview-container').fadeIn();
		}

		$scope.hidePreview = function(elem) {
			$('#spec-preview-container').fadeOut();
			$('#spec-editor').fadeIn();
		}

		$scope.downloadSpec = function() {
			var content = $('#rpm-spec-data').html();
			var fileName = $scope.spec.Name + '.spec';
			DownloadInitiator.initiateDownload(content, fileName, 'text/plain');
		}

		_initialize();
	}
]);

