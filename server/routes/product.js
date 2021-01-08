const express = require("express");
const { adminCheck, authCheck } = require("../middleware/auth");
const router = express.Router();
const { create, listProducts } = require("../controllers/product");

const { bCreate, bRead } = require("../controllers/brand");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listProducts);

router.post("/product/brands", bCreate);
router.get("/product/brands", bRead);

module.exports = router;
