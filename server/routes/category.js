const express = require("express");
const { adminCheck, authCheck } = require("../middleware/auth");
const router = express.Router();
const {
  read,
  update,
  create,
  list,
  remove,
  getSubs,
} = require("../controllers/category");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list); //all categories query
router.get("/category/:slug", read); //single category query
router.put("/category/:slug", authCheck, adminCheck, update); //update single query
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);
module.exports = router;
