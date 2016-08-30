hours.$inject = ['$http'];

function hours($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api';
    var service = {
        getStudentsBySection: getStudentsBySection,
        postHours: postHours,
        getStudentHourReport: getStudentHourReport,
        getFiniquitoURL: getFiniquitoURL
    };

    return service;

    function getStudentsBySection(section, successCallback, errorCallback) {
        let request = {
            method: 'GET',
            url: url + '/Students'
        };

        $http(request).then(successCallback)
            .catch(errorCallback);
    }

    function postHours(hoursData, successCallback, errorCallback) {
        $http.post(url + '/Hours/AddMany', JSON.stringify(hoursData)).then(successCallback)
            .catch(errorCallback);
    }

    function getStudentHourReport(accountId, successCallback, errorCallback) {
        $http.get(url + '/StudentHourReport/' + accountId).
        then(successCallback).catch(errorCallback);
    }

    function getFiniquitoURL(accountId) {
        return url + '/Students/FiniquitoReport/' + accountId;
    }
    
}

module.exports = { name: 'hours', srvc: hours };