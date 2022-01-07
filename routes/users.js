var express = require('express');
const {user_list} = require("../controllers/user");
var router = express.Router();

/* GET users listing. */
router.get('/', user_list);

module.exports = router;
