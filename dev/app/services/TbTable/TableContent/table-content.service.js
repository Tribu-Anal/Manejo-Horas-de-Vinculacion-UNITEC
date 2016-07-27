tableContent.$inject = ['TbUtils'];

function tableContent (TbUtils) {
    var service = {
        createAnInputElement: createAnInputElement,
        createALableElement: createALableElement,
        createAButtonElement: createAButtonElement
    };

    return service;

    function createAnInputElement(inputType) {
        let element = {
            typeObject: 'input',
            properties: {
                value: '',
                type: inputType
            }
        }

        return element;
    };

    function createALableElement(modelValue) {
        let element = {
            typeObject: 'label',
            properties: {
                value: TbUtils.toTitleCase(modelValue),
                click: TbUtils.preventGeneralLoading
            }
        }

        return element;
    };

    function createAButtonElement(objectButton) {
        let element = {
            typeObject: 'button',
            properties: {
                onClick: objectButton.onClick,
                icon: objectButton.icon,
                tooltip: objectButton.tooltip
            }
        }

        return element;
    };
}

module.exports = { name: 'tableContent', srvc: tableContent };