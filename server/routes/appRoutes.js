const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); 

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.pdf');
  }
});
const upload = multer({storage:storage});
router.post('/uploadPDF', upload.single('pdfFile'), appController.generatePDF); 

module.exports = router;