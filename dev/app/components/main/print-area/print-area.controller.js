PrintAreaController.$inject = ['$stateParams', '$state', '$window', 'reports'];

function PrintAreaController($stateParams, $state, $window, reports) {
    var vm = this;
    vm.template = '';
    vm.printButton = {
        icon: 'glyphicon-print',
        onClick: printReport,
        show: false
    };
    init();

    function init() {
        if (!$stateParams.params) {
            $state.go('main.projects');
        } else {
            loadView();
        }
    }

    function loadView() {
        vm.template = $stateParams.templateDir + $stateParams.params.templateUrl;
        reports.setReportParams($stateParams.params.reportParams);
        vm.printButton.show = $stateParams.params.showPrintButton;
    }

    function printReport() {
        $window.print();
    }
}

module.exports = { name: 'PrintAreaController', ctrl: PrintAreaController };