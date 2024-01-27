
const express = require('express');
const router = express.Router();
const {createDocument,getDocuments,deleteDocuments,getDocumentById,updateDocumentTitle}= require('../controllers/document-controller');


router.route('/create-document').post(createDocument);
router.route('/get-documents').get(getDocuments);
router.route('/delete-document').delete(deleteDocuments);
router.route('/get-documentById').get(getDocumentById);
router.route('/update-doc-title').patch(updateDocumentTitle);


module.exports = router;