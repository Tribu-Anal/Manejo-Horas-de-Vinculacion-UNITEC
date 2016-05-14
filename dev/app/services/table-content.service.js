(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('tableContent', tableContent);

	tableContent.$inject = [];

	function tableContent () {
	   var service = {
            createAnInputElement:createAnInputElement,
            createALableElement:createALableElement,
            createAButtonElement:createAButtonElement
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
                    value: modelValue
                }
            }
            return element;
        };

        function createAButtonElement(objectButton){
            let element = {
                typeObject: 'button',
                properties: {
                    onClick: objectButton.onClick,
                    icon: objectButton.icon,
                    tooltip:objectButton.tooltip
                }
            }
            return element;
        };
	}
})();