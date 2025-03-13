const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controller/UserController');

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUser);

module.exports = router;