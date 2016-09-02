
classes.$inject = ['$http'];

function classes($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Classes';
    var service = {
        postClass: postClass,
        get: get
    };

    return service;

    function postClass(data, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(data))
            .then(successCallback)
            .catch(errorCallback);
    }

    function get (page, size, success, error) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc').then(success)
            .catch(error);
    }

}

module.exports = {
    name: 'classes',
    srvc: classes
};