/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addbook } = require("../controllers/booksController");
const { uploadAudio, uploadDocs } = require("../controllers/uploadController");
const upload = require("../middleware/upload");
router.post("/addbook",authMiddleware, addbook);
router.post("/getuser", authMiddleware, getUser);
router.post("/addtask", authMiddleware, addTask);
router.post("/getusertask", authMiddleware, getUserTask);
router.post("/completetask", authMiddleware, completetask);
router.post("/loginuser", loginUser);
router.post("/logoutuser", authMiddleware, logout);
router.post("/upload", upload.single("file"), uploadAudio);
router.post("/uploaduserimg", upload.single("image"), uploadimage);
router.delete("/deletetask/:taskid", authMiddleware, deletetaskbyid);

module.exports = router;
