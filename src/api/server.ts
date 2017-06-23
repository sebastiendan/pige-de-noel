/**
 * Module dependencies.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

/**
 * API routes.
 */

import * as apiController from './controllers/api';

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;