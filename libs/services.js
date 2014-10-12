
var appServices = angular.module('appServices', []);

appServices.factory('ConfigManager', ['$http', function($http) {

    var _config = null;

    function _fetchConfig(callback) {

        $http({
            url: "/conf/config.json",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(data, status, headers, config) {
            
            _config = data;
            callback(_config);
        }).error(function(data, status, headers, config) {
            
            console.error(data);
        });
    }

    return {
        getConfig: function(callback, fresh) {
            
            if(_config && !fresh) {
                callback(_config); 
            } else {
                _fetchConfig(callback)
            }
        }
    };
}]);

appServices.factory('DownloadInitiator', [function() {

    return {
        initiateDownload: function(data, filename, datatype) {
            
            var blob = new Blob([ data ], { type : datatype });
            var url = (window.URL || window.webkitURL).createObjectURL( blob );
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display:none";
            a.href = url;
            a.download = filename;
            a.click();
            (window.URL || window.webkitURL).revokeObjectURL(url);
            document.body.removeChild(a)
        }
    };
}]);

appServices.factory('LicenseManager', ['$http', function($http) {

    var _licenses = null;

    return {
        listLicenses: function(callback, fresh) {
            
            if(_licenses && !fresh) {
                callback(_licenses);
                return;
            }
            $http({
                url: "/conf/licenses.json",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                
                if(callback) callback(data);
            }).error(function(data, status, headers, config) {
                
                console.error(data);
                if(callback) callback({'error': data});
            });
        }
    };
}]);

appServices.factory('PackageManager', ['$http', function($http) {

    var _rpmGroups = null;

    return {
        getSpecConfig: function(specType, callback) {
            var specUrl = "/conf/";

            switch(specType) {
                case "rhel":
                    specUrl += "rpm-spec.json";
                    break;
                default:
                    callback({'error': 'Invalid spec type'});
                    return
            }
            $http({
                url: specUrl,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                
                if(callback) callback(data);
            }).error(function(data, status, headers, config) {
                
                console.error(data);
                if(callback) callback({'error': data});
            });
        },
        getRPMGroups: function(callback, fresh) {

            if(_rpmGroups && !fresh) {
                callback(_rpmGroups);
                return;
            }

            $http({
                url: '/conf/rpm-groups.json',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                
                if(callback) callback(data);
            }).error(function(data, status, headers, config) {
                
                console.error(data);
                if(callback) callback({'error': data});
            });
        },
        getSpecPreview: function(distro, specConfig, callback) {

            $http.post('http://localhost:5000/spec/' + distro, {
                data: specConfig,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).success(function(data, status, headers, config) {
                
                if(callback) callback(data);
            }).error(function(data, status, headers, config) {
                
                console.error(data);
                if(callback) callback({'error': data});
            });
        }
    };    
}]);


