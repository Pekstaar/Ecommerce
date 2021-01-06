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

exports.read = async (req, res) => {
  try {
    //get list of items in datebase
    res.json(await Product.find({}));
  } catch (e) {}
};
