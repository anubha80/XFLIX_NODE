const express = require("express");
const videoController = require("../../controllers/video.controller");
const router = express.Router();


router.get("/", videoController.getAllVideos);
router.get("/:videoId", videoController.getVideoById);
router.post("/", videoController.uploadVideo);
router.patch("/:videoId/votes", videoController.updateVoteCount);
router.patch("/:videoId/views", videoController.updateViewCount);

module.exports = router;