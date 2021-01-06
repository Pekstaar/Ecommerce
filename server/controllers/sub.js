const Sub = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    //   req.headers - carries some data (ie.authentication data)
    //  req.body - carries actual data in a website
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (error) {
    console.log("Create error!", error);
    res.status(400).send("Create Sub-category failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  //capture single category
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log("SUBCATEGORY UPDATE ERROR", error.message);
    res.status(400).send("Subcategory update Failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const toDelete = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(toDelete);
  } catch (e) {
    console.log("subcategory Delete failed", error.message);
    res.status(400).send("subcategory Delete failed");
  }
};
