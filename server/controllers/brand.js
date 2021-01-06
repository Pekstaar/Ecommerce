const Brands = require("../models/brands");

exports.bCreate = async (req, res) => {
  const { name } = req.body;
  await new Brands({ name }).save();
  res.json("saved");
};

exports.bRead = async (req, res) => {
  res.json(await Brands.find({}));
};
