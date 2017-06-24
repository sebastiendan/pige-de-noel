import angular = require('angular');
require('angular-ui-router');
require('angular-material');

require('../../node_modules/angular-material/angular-material.min.css');
require('./common/styles/elements.scss');

export default angular.module('pige-de-noel', ['ui.router', 'ngMaterial']);