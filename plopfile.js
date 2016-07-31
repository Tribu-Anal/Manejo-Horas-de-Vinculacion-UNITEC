'use strict';

const componentGen = require('./generators/component.generator'),
      serviceGen   = require('./generators/service.generator'),
      sharedGen    = require('./generators/shared.generator'),
      bundleGen    = require('./generators/bundle.generator');

module.exports = plop => {
	plop.addPrompt('directory', require('inquirer-directory'));

    plop.setGenerator(componentGen.name, componentGen.generator);
    plop.setGenerator(serviceGen.name, serviceGen.generator);
    plop.setGenerator(sharedGen.name, sharedGen.generator);
    plop.setGenerator(bundleGen.name, bundleGen.generator);
};