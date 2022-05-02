const express = require('express');
const {ingredients_list, create_ingredients} = require("../controllers/ingredients");
const router = express.Router();

router.get('/', ingredients_list);
router.post('/', create_ingredients);

module.exports = router;
