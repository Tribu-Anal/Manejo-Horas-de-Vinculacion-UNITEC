EditHoursController.$inject = ['$stateParams', '$state', 'sections', 'projects',
    'TbUtils', 'tableContent', '$rootScope', 'hours', '$mdDialog', 'students'
];

function EditHoursController($stateParams, $state, sections, projects,
    TbUtils, tableContent, $rootScope, hours, $mdDialog, students) {
    const vm = this;

    vm.participantsLoading = true;
    vm.editHours = {
        visible: $rootScope.Role === 'Professor',
        value: false,
        text: 'Habilitar la edición de las horas'
    }
    vm.evaluateProject = {
        onClick: evaluateProject
    }
    vm.projectName = null;
    vm.addHours = {
        onClick: addHours,
        icon: 'glyphicon-plus',
        tooltip: 'Agregar horas'
    }
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre', 'Horas en este proyecto']);
    sections.getStudentsHoursBySectionProjectId($stateParams.sectionId, $stateParams.projectId, getStudentsHoursSuccess, getStudentsHoursFail);
    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    function getStudentsHoursSuccess(response) {
        if (response.data.length <= 0)
            return;
        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let inputProperties = {
                value: student.Hours[0] ? student.Hours[0].Amount : 0,
                type: 'number',
                min: 0,
                max: 100
            };
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.Students.AccountId),
                    tableContent.createALableElement(student.Students.Name),
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
    }

    function getProjectFail(response) {

    }

    function evaluateProject() {
        TbUtils.preventGeneralLoading();
        $state.go('main.evaluateproject', {
            projectId: $stateParams.projectId
        });
    }

    function getStudentsHour() {
        let table = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            let student = vm.studentsTable.body[i];
            let element = {
                AccountId: student.data.Students.AccountId,
                HourId: student.data.Hours[0] ? student.data.Hours[0].Id : -1,
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
