const express = require("express");
const router = express.Router();

// midddleware
const { authCheck, adminCheck } = require("../middleware/auth");

// controllers

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
