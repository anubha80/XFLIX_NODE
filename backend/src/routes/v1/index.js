const express = require("express");
const videoRoute = require("./video.route");

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.use("/videos",jsonParser, videoRoute);

module.exports = router;