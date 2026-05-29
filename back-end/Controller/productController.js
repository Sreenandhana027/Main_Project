const Product = require("../models/Product");

// *get all products
exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;

        let products;

        if (category) {
            products = await Product.find({ category });
            // console.log(products);


        } else {
            products = await Product.find();
            console.log("producttt : ", products);

        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

// *get single product
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

// *add product (admin)
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

// *update product (admin)
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

// *delete product (admin)
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};
