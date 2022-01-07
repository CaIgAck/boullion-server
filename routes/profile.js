const express = require('express');
const {user_details_by_email} = require("../controllers/user");
const router = express.Router();

/* GET users listing. */
router.get('/', user_details_by_email);

module.exports = router;
