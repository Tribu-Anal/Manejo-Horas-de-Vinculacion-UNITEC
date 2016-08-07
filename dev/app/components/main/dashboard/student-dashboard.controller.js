StudentDashboardController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections', 'filterFilter', 'hours', 'students'];

function StudentDashboardController ($rootScope, $scope, $state, TbUtils, tableContent,
                                      sections, filterFilter, hours, students) {
	const vm = this;

  students.getAccountId($rootScope.StudentId, getAccountIdSuccess, getAccountIdFail);

  function getAccountIdSuccess(response){
      console.log(response);
  }

  function getAccountIdFail(response){
      console.log(response);
  }
  //
  // function getStudentHourReportSuccess(){
  //
  // }
  //
  // function getStudentHourReportFail(){
  //
  // }

  // // sections.getSections(getSectionsSuccess, getSectionsFail);
  //
  // function goSection(index) {
  //     console.log("Entro");
  // }
  //
  // sections.getSections(getTotalSectionsSuccess, getTotalSectionsFail);
  //
  // function getTotalSectionsSuccess(response) {
  //     console.log(response);
  //     TbUtils.fillListWithResponseData(response.data, vm.totalSections);
  // }
  //
  // $scope.$watch('search.data', function(term) {
  //     let obj = {
  //         Class: {
  //             Name: term
  //         }
  //     };
  //
  //     if(term && term.length >= vm.limitInLettersToSearch) {
  //         let filterSections = {data: filterFilter(vm.totalSections, obj)};
  //         let filterTable = [];
  //         constructTableBody(filterSections, filterTable);
  //         vm.sectionsTable.body = filterTable;
  //     }
  //
  //     else {
  //         console.log('vacio');
  //         vm.sectionsTable.body = vm.paginationSections;
  //     }
  // });
  //
  // function getTotalSectionsFail(response) {
  //     console.log(response);
  // }
  //
  // function getSectionsSuccess(response) {
  //     console.log(response.data.length);
  //     if (response.data.length <= 0) {
  //         vm.sectionsLoading = false;
  //         return;
  //     }
  //
  //     constructTableBody(response, vm.paginationSections);
  //
  //     vm.sectionsTable.body = vm.paginationSections;
  //     vm.sectionsLoading = false;
  // };
  //
  // function constructTableBody(response, tableSections) {
  //     for (let i = 0; i < response.data.length; i++) {
  //         console.log('Entro');
  //         let section = response.data[i];
  //         let name = 'N/A';
  //
  //         if (section.User !== null)
  //             name = section.User.Name;
  //
  //         let newTableElement = {
  //             content: [
  //                 tableContent.createALableElement(section.Code),
  //                 tableContent.createALableElement(section.Class.Name),
  //                 tableContent.createALableElement(section.Period.Number),
  //                 tableContent.createALableElement(section.Period.Year),
  //                 tableContent.createALableElement(name)
  //             ],
  //             data: section
  //         };
  //
  //         //vm.sectionsTable.body.push(newTableElement);
  //         tableSections.push(newTableElement);
  //     }
  // }
  //
  // sections.getSectionCount(getSectionCountSuccess, getSectionCountFail);
  //
  // function getSectionCountSuccess(response) {
  //     vm.options.count = response.data[0].Id;
  //     vm.sectionsLoading = true;
  //     sections.getSectionsWithPagination(vm.options.startingPage,
  //         vm.options.pageSize, getSectionsSuccess, getSectionsFail);
  // }
  //
  // function getSectionCountFail() {
  //     getSectionsFail();
  // }
  //
  // function getSectionsFail() {
  //     vm.sectionsLoading = false;
  //     TbUtils.displayNotification('error', 'Error',
  //         'No se pudieron cargar las secciones correctamente.');
  // }
  //
  // function onPageChange(skip, page) {
  //     if($scope.search) $scope.search.data = '';
  //     vm.sectionsTable.body = [];
  //     vm.paginationSections = [];
  //     vm.sectionsLoading = true;
  //     sections.getSectionsWithPagination(page, skip,
  //         getSectionsSuccess, getSectionsFail);
  // }
}

module.exports = { name: 'StudentDashboardController', ctrl: StudentDashboardController };
