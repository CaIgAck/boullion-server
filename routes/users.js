var express = require('express');
const {user_list, user_details} = require("../controllers/user");
var router = express.Router();

/* GET users listing. */
router.get('/', user_list);
router.get('/:id', user_details);

module.exports = router;
