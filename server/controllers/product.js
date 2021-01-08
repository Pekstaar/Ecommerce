const Product = require("../models/product");
const Brands = require("../models/brands");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    console.log(req.body);
    const newProd = await new Product(req.body).save();
    res.json(newProd);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

exports.listProducts = async (req, res) => {
  //get list of items in datebase

  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["created", "desc"]])
    .exec();

  res.json(products);
};

// delete product
exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();

    // send deleted product to front-end
    res.send(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product delete failed");
  }
};
