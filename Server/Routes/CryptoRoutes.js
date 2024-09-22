const express = require("express");
const cryptoController = require("./../Controllers/cryptoController");

const router = express.Router();

// Routes
router.route("/cryptocurrencies").get(cryptoController.cryptoData);

module.exports = router;
