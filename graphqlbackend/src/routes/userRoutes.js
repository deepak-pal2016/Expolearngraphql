/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addbooks } = require("../controllers/booksController");
const {
  addUser,
  getUser,
  loginUser,
  logout,
  uploadimage
} = require('../controllers/userController');
const { uploadAudio, uploadDocs } = require("../controllers/uploadController");
const upload = require("../middleware/upload");
router.post('/adduser', addUser);
router.post("/addbook",authMiddleware, addbooks);
router.post("/getuser", authMiddleware, getUser);
router.post("/loginuser", loginUser);
router.post("/logoutuser", authMiddleware, logout);
router.post("/upload", upload.single("file"), uploadAudio);
router.post("/uploaduserimg", upload.single("image"), uploadimage);

module.exports = router;
