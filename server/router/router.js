// const router = require("express").Router();
// const controller = require("../controller/controller");
// const billController = require("../controller/billController");

// router.post("/scanQr", controller.scanQr);
// router.get("/generateQRcode", billController.generateQrCode);
// router.get("/tester", billController.serveIndexHtml);
// router.get("/getBill", billController.generateStripeBill);

// module.exports = router;
// route.js

const express = require("express");
const router = express.Router();
const qrCodeController = require("../controller/qrCodeController");
const profileController = require("../controller/profileController");
const authController = require("../controller/authController");
const mediaController = require("../controller/mediaController");
const Profile = require("../models/Profile");
const qrCodeSchema = require("../models/qrCodeSchema");
const multer = require("multer");
const path = require("path");

// ...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "medallionImages"); // Specify upload destination folder
  },
  filename: function (req, file, cb) {
    console.log("file = ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Adjust the file size limit as needed
});

router.use(express.json());

router.post("/generateQrCode", qrCodeController.generateQrCode);
router.post("/createProfile", profileController.createProfile);
router.get("/userProfile", profileController.getProfileByUsername);
router.get("/getProfile", profileController.getProfileByQrId);
router.post(
  "/updateQRCodeWithUserProfile",
  qrCodeController.passQrCodeProfileData
);
router.get("/batchGenerateQrCodes", qrCodeController.batchGenerateQrCodes);
router.post(
  "/createMedallionProfile",
  upload.single("profilePicture"), // Assuming you're uploading a single file with the field name 'profilePicture'
  profileController.createMedallionProfile
);
router.post("/login", authController.handleLogin);
router.post("/checkProfileExists", qrCodeController.doesQrCodeHaveProfile);
router.post("/updateQRCode", qrCodeController.updateQrCode);
router.get("/getQrUrl", qrCodeController.getQRCodeSVGUrl);

router.post("/uploadMedia", mediaController.uploadProfileMedia);

module.exports = router;
