(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('PrintAreaController', PrintAreaController);

    PrintAreaController.$inject = ['$stateParams', '$state', '$window', 'reports'];

    function PrintAreaController($stateParams, $state, $window, reports) {
        var vm = this;
        vm.template = '';
        vm.printButton = {
            icon: 'glyphicon-print',
            onClick: printReport
        };
        init();

        function init() {
            if (!$stateParams.params) {
                $state.go('dashboard.home');
            } else {
                loadView();
            }
        }

        function loadView() {
            vm.template = $stateParams.templateDir + $stateParams.params.templateUrl;
            reports.setReportParams($stateParams.params.reportParams);
        }

        function printReport() {
            $window.print();
        }
    }
})();