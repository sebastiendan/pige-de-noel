import * as pigeController from '../controllers/pige';

let express = require('express');

let router = express.Router();

router.get('/get', pigeController.getPige);

module.exports = router;