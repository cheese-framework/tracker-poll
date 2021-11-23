const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.route("/register").post(controller.createUser);
router.route("/login").post(controller.loginUser);

module.exports = router;
