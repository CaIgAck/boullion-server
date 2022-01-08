const express = require('express');
const {crete_receipt, receipt_details, receipt_list} = require("../controllers/receipt");
const router = express.Router();


router.post('/', crete_receipt);
router.get('/', receipt_list);
router.get('/:id', receipt_details);

module.exports = router;
