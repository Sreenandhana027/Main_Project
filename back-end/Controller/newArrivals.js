const NewArrival = require("../models/productnew"); // make sure the model is correct

// GET all new arrivals (with optional filter and sort)
const getProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;

    const filter = {};
    if (category) {
      const categories = category.split(",").map((c) => c.trim());
      filter.category = { $in: categories };
    }

    let sortObj = { createdAt: -1 };
    if (sort === "price-low") sortObj = { price: 1 };
    if (sort === "price-high") sortObj = { price: -1 };

    const products = await NewArrival.find(filter).sort(sortObj);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single new arrival by ID
const getProductById = async (req, res) => {
  try {
    const product = await NewArrival.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new arrival
const createProduct = async (req, res) => {
  try {
    const { name, price, category, tag, img } = req.body;
    const product = await NewArrival.create({ name, price, category, tag, img });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  try {
    const product = await NewArrival.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const product = await NewArrival.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SEED products
const seedProducts = async (req, res) => {
  try {
    const products = require("../data/products.json");
    await NewArrival.deleteMany({});
    const inserted = await NewArrival.insertMany(products);

    res.status(201).json({
      success: true,
      message: `${inserted.length} products seeded successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};