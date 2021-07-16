const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/'});



module.exports = router;