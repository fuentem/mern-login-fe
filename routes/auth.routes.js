const express = require('express');
const router = express.Router();
const { signup, signin, verifyOTP } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verifyOTP', verifyOTP);

module.exports = router;