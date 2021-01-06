const express = require("express");
const { adminCheck, authCheck } = require("../middleware/auth");
const router = express.Router();
const { create, read } = require("../controllers/product");

const { bCreate, bRead } = require("../controllers/brand");

router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

router.post("/product/brands", bCreate);
router.get("/product/brands", bRead);

module.exports = router;
