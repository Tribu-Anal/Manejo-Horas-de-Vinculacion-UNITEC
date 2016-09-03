
classes.$inject = [ '$http', 'TbUtils' ];

function classes($http, TbUtils) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Classes';
    var service = {
        postClass: postClass,
        update: update,
        get: get,
        getAndLoad: getAndLoad
    };

    return service;

    function postClass(data, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(data))
            .then(successCallback)
            .catch(errorCallback);
    }

    function update (id, data, success, error) {
        $http.put(url + '/' + id, data)
            .then(success)
            .catch(error);
    }

    function get (page, size, success, error, _finally) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(_finally);
    }

    function getAndLoad (page, size, list, fin) {
        get(page, size, resp => { TbUtils.fillListWithResponseData(resp.data, list); },
                        resp => { TbUtils.showErrorMessage(resp.data); },
                        fin);
    }

}

module.exports = {
    name: 'classes',
    srvc: classes
};