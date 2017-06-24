import * as membersController from '../controllers/members';

let express = require('express');

let router = express.Router();

router.get('/all', membersController.getMembers);

module.exports = router;