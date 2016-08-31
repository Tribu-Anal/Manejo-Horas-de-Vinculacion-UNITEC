EditHoursController.$inject = ['$stateParams', '$state', 'sections', 'projects',
    'TbUtils', 'tableContent', '$rootScope', 'hours', '$mdDialog', 'students','sectionProjects'
];

function EditHoursController($stateParams, $state, sections, projects,
    TbUtils, tableContent, $rootScope, hours, $mdDialog, students, sectionProjects) {
    const vm = this;

    vm.participantsLoading = true;
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
    vm.editHours = {
        visible: $rootScope.Role !== 'Student',
        value: false,
        text: 'Habilitar la edición de las horas'
    }
    vm.isApproved = {
        visible: false
    }
    vm.evaluateProject = {
        onClick: evaluateProject
    }
    vm.projectName = null;
    vm.sprojects = null;
    vm.cost = null;
    vm.sectionprojects = [];
    vm.description = null;
    vm.addHours = {
        onClick: addHours,
        icon: 'glyphicon-plus',
        tooltip: 'Agregar horas'
    }
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre', 'Horas en este proyecto']);
    sections.getStudentsHoursBySectionProjectId($stateParams.sectionId, $stateParams.projectId, getStudentsHoursSuccess, getStudentsHoursFail);
    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    sectionProjects.getUnapproved(unapprovedSuccess, unapprovedFail);

    function unapprovedSuccess(response){
        vm.preventGeneralLoading();
        vm.sprojects = response.data;
        if(vm.sprojects.length <= 0) return;

        vm.sectionsProjectsLoading = false;
    }

    function unapprovedFail(response){
        TbUtils.displayNotification('error', 'Error',
                'Informacion correspondiente al dashboard no se pudo cargar.');
    }

    function getStudentsHoursSuccess(response) {
        console.log(response);
        vm.isApproved.visible = response.data.IsApproved;
        if (response.data.Hours.length <= 0) {
            TbUtils.displayNotification('error', 'Error',
                'Esta sección y proyecto no tienen alumnos asginados.');
            return;
        }
        if(vm.isApproved.visible)
            TbUtils.displayNotification('warning', 'Aviso',
                'Las horas de esta sección ya fueron aprobadas.');

        for (let i = 0; i < response.data.Hours.length; i++) {
            let student = response.data.Hours[i];
            let inputProperties = {
                value: student.Hours ? student.Hours.Amount : 0,
                type: 'number',
                min: 0,
                max: 100
            };
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.User.AccountId),
                    tableContent.createALableElement(student.User.Name),
                    tableContent.createAnInputElement(inputProperties)
                ],
                data: student
            };

            vm.studentsTable.body.push(newTableElement);
        }
        vm.participantsLoading = false;
    }

    function getStudentsHoursFail() {
        vm.participantsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente.');
    }

    function getProjectSuccess(response) {
        vm.projectName = TbUtils.toTitleCase(response.data.Name);
        vm.description = TbUtils.toTitleCase(response.data.Description);
    }

    function getProjectsBySection(sectionId) {
        sections.getProjects(sectionId, getProjectSuccess, getProjectFail);
    }

    function getProjectFail(response) {

    }

    function evaluateProject() {
        TbUtils.preventGeneralLoading();
        $state.go('main.evaluateproject', {
            projectId: $stateParams.projectId,
            sectionId: $stateParams.sectionId
        });
    }

    function getStudentsHour() {
        let table = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            let student = vm.studentsTable.body[i];
            let element = {
                AccountId: student.data.User.AccountId,
                HourId: student.data.Hours ? student.data.Hours.Id : -1,
                Hour: student.content[2].properties.value
            }
            table.push(element);
        }
        return table;
    }

    function addHours() {
        showConfirmDialog();
    }

    function showConfirmDialog() {
        const confirm = $mdDialog.confirm()
            .title('¿Está seguro de que quiere registrar las horas?')
            .textContent('Está apunto de asignarle horas a los estudiantes de esta sección en este proyecto.')
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(result => {
            if (result)
                saveHours();
        });
    }

    function saveHours() {
        let obj = {
            ProjectId: parseInt($stateParams.projectId),
            SectionId: parseInt($stateParams.sectionId),
            StudentsHour: getStudentsHour()
        };
        hours.postHours(obj, postHoursSuccess, postHoursFail);
    }

    function postHoursFail(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron registrar las horas');
    }

    function postHoursSuccess() {
        TbUtils.displayNotification('success', 'Exitoso',
            'Horas registradas exitosamente.');
        vm.editHours.value = false;
        location.reload()
    }
}

module.exports = {
    name: 'EditHoursController',
    ctrl: EditHoursController
};