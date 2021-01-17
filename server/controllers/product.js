const Product = require("../models/product");
const slugify = require("slugify");
const { findOneAndUpdate } = require("../models/product");

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
exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    console.log("Delete failed", error.message);
    res.status(400).send("Delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category") //get category object details
    .populate("subs")
    .exec();

  res.json(product);
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const toUpdate = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    res.json(toUpdate);
  } catch (err) {
    console.log("Product Update error! ===>", err);
    return res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err.message);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();

  res.json(total);
};
