const express = require("express");
const {create_survey} = require("../controllers/survey");
const router = express.Router();

router.post('/', create_survey);

module.exports = router;
