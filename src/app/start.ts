import app from './app';
// require('./components');

import angular = require("angular");
import routeConfig = require("./route-config");

app.config(routeConfig);

angular.element(document).ready(() => {
    angular.bootstrap(document, [app.name]);
});