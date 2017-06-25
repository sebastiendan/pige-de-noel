import * as pigeController from '../controllers/pige';

let express = require('express');

let router = express.Router();

router.get('/get', pigeController.getPige);
router.get('/run', pigeController.runPige);

module.exports = router;