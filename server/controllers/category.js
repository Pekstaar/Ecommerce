const Category = require("../models/category");
const Sub = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    //   req.headers - carries some data (ie.authentication data)
    //  req.body - carries actual data in a website
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    console.log("Create error!", error.message);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  //capture single category
  let cat = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(cat);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log("UPDATE ERROR", error.message);
    res.status(400).send("Update Failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const toDelete = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(toDelete);
  } catch (e) {
    console.log("Delete failed", error.message);
    res.status(400).send("Delete failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
