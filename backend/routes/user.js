const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.createUser);

module.exports = router;





