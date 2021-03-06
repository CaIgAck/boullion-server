const express = require('express');
const {create_file} = require("../controllers/file");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


router.post('/',upload.single('img'), create_file);

module.exports = router;
