
const express = require('express');
const router = express.Router();
const {createDocument}= require('../controllers/document-controller');


router.route('/create-document').post(createDocument);


module.exports = router;