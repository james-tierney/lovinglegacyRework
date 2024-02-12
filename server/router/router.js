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
const Profile = require("../models/Profile");
const qrCodeSchema = require("../models/qrCodeSchema");
const multer = require("multer");

// ...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  },
});

const upload = multer({ storage: storage });

router.use(express.json());

router.post("/generateQrCode", qrCodeController.generateQrCode);
router.post("/createProfile", profileController.createProfile);
router.get("/userProfile", profileController.getProfileByUsername);
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
module.exports = router;
