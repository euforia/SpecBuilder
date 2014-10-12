
var appDirectives = angular.module('appDirectives', [])

appDirectives.directive('appStage', ['$window', function($window) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if(!ctrl) return;

			var stage = { jDom: $(elem) };
			stage.fillScreen = function() {

				if(stage.jDom) {
					
					stage.jDom.css("width", $window.innerWidth - stage.jDom.scrollWidth);
					stage.jDom.css("height", $window.innerHeight);
				}
			};

			function init() {
			
				stage.fillScreen();
				$window.addEventListener("resize", function(event) { $stage.fillScreen() });
			}

			init();
		}
	}
}]);

appDirectives.directive('autoResize', [function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if(!ctrl) return;

			var jElem = $(elem);
			jElem.height(jElem.prop('scrollHeight'));
			
			jElem.keyup(function(evt) {;
				if(evt.keyCode === 13) {
					if(jElem.prop('scrollHeight') > jElem.prop('clientHeight')) {
						jElem.height(jElem.prop('scrollHeight'));
					}
				} else if(evt.keyCode === 8 || evt.keyCode === 46) {
					var lineCnt = (jElem.html().split("\n")).length;
					jElem.height(lineCnt*25);
				}
			});
		}
	};
}]);

appDirectives.directive('codeBlock', [function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if(!ctrl) return;

			var jElem = $(elem);
			jElem.prop('spellcheck', false);
		}
	};
}]);