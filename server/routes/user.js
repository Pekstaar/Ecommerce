const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "YOU HIT the USER API ",
  });
});

module.exports = router;
