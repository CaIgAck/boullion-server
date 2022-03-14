const express = require("express");
const {create_survey, survey_details} = require("../controllers/survey");
const router = express.Router();

router.post('/', create_survey);
router.get('/:id', survey_details);

module.exports = router;
