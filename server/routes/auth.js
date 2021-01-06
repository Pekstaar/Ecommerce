const express = require("express");

const router = express.Router();

// middleWares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller - import for externally created callbacks
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
//route
// takes 2 arguments(url, callback to access response and request) may take middleware
//arglast - controller(callback(next) function) , arg2-midddleware
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

// const middleWare = (req, res, next) => {
//   console.log("Im a middle ware");
//   console.log("Loading to next...");
//   next();
// };

// router.get("/testing", middleWare, (req, res) => {
//   res.json({
//     data: "YOU HIT MIDDLEWARE",
//   });
// });

module.exports = router;
