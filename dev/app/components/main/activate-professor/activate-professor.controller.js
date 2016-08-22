ActivateProfessorController.$inject = ['$rootScope', '$state', '$stateParams', 'professors', 'TbUtils', 'auth'];

function ActivateProfessorController($rootScope, $state, $stateParams, professors, TbUtils, auth) {

    var vm = this;

    vm.professor = {
        AccountId: '',
        Password: ''
    };

    vm.accountId;
    vm.confirmPass = '';

    vm.activateProfessor = activateProfessor;
    $rootScope.globals.guest = true;

    leaveIfSessionStarted();
    getToken();

    function activateProfessor() {
        professors.activateProfessor(vm.professor, activateProfessorSuccess, activateProfessorFail);
    }

    function activateProfessorSuccess(response) {
        $state.go('landing.login');
        TbUtils.displayNotification('success', 'Usuario activado!', 'Ya puede navegar el sitio.');
    }

    function activateProfessorFail(response) {
        TbUtils.showErrorMessage('error', response, 'No se ha podido activar el profesor.', 'Error!');
        $state.go('landing.login');
    }

    function getToken() {
        if ($stateParams.accountId == undefined || $stateParams.accountId == '')
            $state.go('landing.login');
        vm.professor.AccountId = $stateParams.accountId;
    }

    function leaveIfSessionStarted() {
        if ($rootScope.globals.token) {
            auth.ClearCredentials();
            $state.go('landing.login');
        }
    }
}

module.exports = {
    name: 'ActivateProfessorController',
    ctrl: ActivateProfessorController
};