const express = require('express');
const router = express.Router();

const { addPosition, positionList, deletePosition, uploadPic, updatePosition } = require('../controllers/positions');
const { uploadMiddleware } = require('../middlewares/upload');

//router.post('/addPosition',upload.single('companyLogo'), addPosition);
router.post('/addPosition', uploadMiddleware, addPosition);
router.get('/positionList', positionList);
router.delete('/deletePosition', deletePosition);
router.post('/uploads', uploadMiddleware, uploadPic);
router.patch('/updatePosition', uploadMiddleware, updatePosition);

module.exports = router;