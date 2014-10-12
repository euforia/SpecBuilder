
var app = angular.module('app', [
	'ngRoute',
	'appDirectives',
	'appFactories',
	'appControllers',
	'appServices'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'loginController'
			})
			.when('/packager', {
				templateUrl: 'partials/packager.html',
				controller: 'packagerController'
			})
			.when('/specbuilder', {
				templateUrl: 'partials/spec-builder.html',
				controller: 'specBuilderController'
			})
			.otherwise({
				redirectTo: '/login'
			});
	}
]);

app.filter('objectLength', function() {
	
	return function(obj) {
    	
    	return Object.keys(obj).length;
	};
}).filter('rpmSources', function() {
	
	return function(sources) {
		
		var out = "";
		for(var i=0; i < sources.length; i++) {
			
			if(sources[i] !== "") 
				out += "Source"+i+"         : "+sources[i]+"\n";
		}
		return out.replace(/\n$/, '');
	}
});
