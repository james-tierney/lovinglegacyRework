const QrCode = require("qrcode");

module.exports.scanQr = async (req, res) => {
  try {
    const url = req.body.url;

    const QR = await QrCode.toDataURL(url);
    res.send(QR);
  } catch (error) {
    console.log(error);
  }
};
