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
// ...

router.use(express.json());

router.post("/generateQrCode", qrCodeController.generateQrCode);
router.post("/createProfile", profileController.createProfile);
router.get("/userProfile/:username", profileController.getProfileByUsername);

module.exports = router;
