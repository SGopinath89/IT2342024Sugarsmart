const express = require('express');
const { signUp, login, getAllUsers } = require('../controller/userController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/allusers', verifyToken, getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;