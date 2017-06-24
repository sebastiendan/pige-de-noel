import app from './app';
require('./components');
require('./factories');

import angular = require('angular');
import routeConfig = require('./route-config');
import themeConfig = require("./theme-config");

app.config(routeConfig).config(themeConfig);

angular.element(document).ready(() => {
    angular.bootstrap(document, [app.name]);
});