const Cart = require("../models/cartmodel");

// add to cart
exports.addToCart = async (req, res) => {
  try {
    const newItem = new Cart({
      userId: req.userId,
      productId: req.body.productId,
      quantity: req.body.quantity || 1,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.userId })
      .populate("productId");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove item
exports.removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json(err);
  }
};
