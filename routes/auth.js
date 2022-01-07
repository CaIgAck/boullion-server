const express = require("express");
const {user_create, user_login} = require("../controllers/auth");
const router = express.Router();

router.post('/registration', user_create);
router.post('/login', user_login);

module.exports = router;
