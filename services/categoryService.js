const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc     Create category
// @route    POST /api/v1/categories
// @access   Private
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.create({
    name: req.body.name,
    slug: slugify(req.body.name, { lower: true }),
  });

  res.status(201).json({ data: category });
});

// @desc     Get categories
// @route    GET /api/v1/categories
// @access   Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 5, 1), 100);
  const skip = (page - 1) * limit;

  const categories = await categoryModel.find({}).skip(skip).limit(limit);

  res.status(200).json({
    results: categories.length,
    page,
    limit,
    data: categories,
  });
});

// @desc     Get specific category
// @route    GET /api/v1/categories/:id
// @access   Public
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ msg: `No category for the id ${req.params.id}` });
  }

  res.status(200).json({ data: category });
});

// @desc     Update specific category
// @route    PUT /api/v1/categories/:id
// @access   Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name, { lower: true }) },
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({ msg: `No category for the id ${req.params.id}` });
  }

  res.status(200).json({ data: category });
});

// @desc     Delete specific category
// @route    DELETE /api/v1/categories/:id
// @access   Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({ msg: `No category for the id ${req.params.id}` });
  }

  res.status(204).send();
});
