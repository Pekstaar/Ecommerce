const express = require("express");
const { adminCheck, authCheck } = require("../middleware/auth");
const router = express.Router();
const { read, update, create, list, remove } = require("../controllers/sub");

router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list); //all categories query
router.get("/sub/:slug", read); //single category query
router.put("/sub/:slug", authCheck, adminCheck, update); //update single query
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
