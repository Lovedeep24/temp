const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { registerController, loginController, fileController, userController, adminController } = require('../controllers/index')

router.post('/register',registerController.register);
router.post('/login', loginController.login);
router.post('/upload', auth,fileController.upload);
router.get('/userprofile/:userId',auth, userController.userProfile);
router.get('/match/:docId/:userId',auth,fileController.match);
router.patch('/creditRequest/:userId' ,auth,userController.creditRequest);
router.get('/getcreditrequest',auth,admin, adminController.getCreditRequest);
router.patch('/approve/:userId',auth,admin, adminController.approveCreditRequest);
router.patch('/decline/:userId',auth,admin, adminController.declineCreditRequest);
router.get('/analytics',auth,admin, adminController.getUserScans);
router.get('/topusers',auth,admin, adminController.topUsers);
router.get('/topic',auth,admin, adminController.topTopic);
module.exports = router;