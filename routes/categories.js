const express = require('express');
const {category_details, category_list, create_categories} = require("../controllers/category");
const router = express.Router();

router.get('/', category_list);
router.get('/:id', category_details);
router.post('/', create_categories);

module.exports = router;
