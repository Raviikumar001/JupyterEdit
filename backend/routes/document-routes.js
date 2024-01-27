
const express = require('express');
const router = express.Router();
const {createDocument,getDocuments,deleteDocuments}= require('../controllers/document-controller');


router.route('/create-document').post(createDocument);
router.route('/get-documents').get(getDocuments);
router.route('/delete-document').delete(deleteDocuments);


module.exports = router;