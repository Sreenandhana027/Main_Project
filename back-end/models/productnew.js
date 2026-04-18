const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Outerwear", "Knitwear", "Tailoring", "Shirts"],
        },
        tag: {
            type: String,
            enum: ["NEW ARRIVAL", "BESTSELLER", "LIMITED", "ESSENTIAL", null],
            default: null,
        },
        img: {
            type: String,
            required: [true, "Image URL is required"],
        },
    },
    {
        timestamps: true,
        collection: "newArrivals", // exact Atlas collection name
    }
);

module.exports = mongoose.model("NewArrival", productSchema); // 👈 renamed from "Product"