const express = require("express");
const router = express.Router();
const controller = require("../controllers/polls");
const auth = require("../middlewares/auth");

router
  .route("/")
  .get(controller.getRegions)
  .post(auth, controller.uploadPollData);

router.route("/:region").get(controller.getConstituencies);

router.route("/constituency/:constituency").get(controller.getStations);

module.exports = router;
