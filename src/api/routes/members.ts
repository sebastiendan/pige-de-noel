import * as membersController from '../controllers/members';

let express = require('express');

let router = express.Router();

router.get('/all', membersController.getMembers);
router.get('/get/:memberId', membersController.getMember);
router.post('/post', membersController.postMember);
router.patch('/patch', membersController.patchMember);

module.exports = router;