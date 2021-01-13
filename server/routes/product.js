const express = require("express");
const { adminCheck, authCheck } = require("../middleware/auth");
const router = express.Router();
const {
  create,
  listProducts,
  removeProduct,
  read,
  updateProduct,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listProducts);
router.delete("/product/:slug", authCheck, adminCheck, removeProduct);
router.get("/product/:slug", read); //get single product based on slug
router.put("/product/:slug", authCheck, adminCheck, updateProduct);

module.exports = router;
