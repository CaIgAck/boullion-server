const express = require('express');
const {crete_receipt, receipt_details, receipt_list, receipt_update} = require("../controllers/receipt");
const router = express.Router();


router.post('/', crete_receipt);
router.get('/', receipt_list);
router.get('/:id', receipt_details);
router.patch('/:id', receipt_update);

module.exports = router;
