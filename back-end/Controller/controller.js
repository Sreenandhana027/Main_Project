const User = require('../models/model')
const Company = require("../models/companymodel");
const fs = require("fs");
const path = require("path");
// *import jwt token
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.paymentKey);
// logic for register
// ***postman correct
exports.userRegister = async (req, res) => {
    console.log("Inside register function");

    // *destructure
    const { username, email, password } = req.body;
    const profile = req.file ? req.file.filename : "";

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(401).json("Already User Existed");
        } else {
            const newUser = new User({ username, email, password, profile });
            await newUser.save();
            res.status(200).json({ message: "Register successfully", newUser });
        }
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json(error);
    }
};


// login
// **postman correct
exports.userLogin = async (req, res) => {
    console.log("inside login function");

    const { email, password } = req.body
    console.log("BODY RECEIVED:", req.body);

    try {
        const existingUser = await User.findOne({ email })
        console.log("existing User :", existingUser);



        if (existingUser) {
            if (password == existingUser.password) {
                // token generation
                const token = jwt.sign(
                    { userMail: existingUser.email, role: existingUser.role },
                    process.env.jwtKey, { expiresIn: "1d" }

                );
                console.log("LOGIN KEY:", process.env.jwtKey);
                console.log(token);

                res.status(200).json(
                    {
                        message: "Login succefully",
                        existingUser,
                        token
                    });

            }
            else {
                res.status(401).json({ message: "Password is incorrect" });

            }
        }
        else {
            res.status(401).json({ message: "User not found" });

        }

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        alert(err?.res?.data?.message || "Login failed");

    }


}

exports.GoogleLogin = async (req, res) => {
    console.log("inside google login");
    const { email, profile, password, username } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // token generation
            const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.jwtKey)
            console.log(token);
            res.status(200).json({ message: "Login succefully", existingUser, token })
        }
        else {
            const newUser = new User({ email, profile, password, username })
            await newUser.save()
            // token generation
            const token = jwt.sign({ userMail: newUser.email, role: newUser.role }, process.env.jwtKey)
            console.log(token);
            res.status(200).json({ existingUser: newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }

}


// * for company module
// **companyRegister
exports.companyRegister = async (req, res) => {
    console.log("Inside company register function");

    const { companyName, email, password } = req.body;


    try {
        const existingCompany = await Company.findOne({ email });

        if (existingCompany) {
            res.status(401).json("Company already exists");
        } else {
            const newCompany = new Company({
                companyName,
                email,
                password,
                role: "company"
            });


            await newCompany.save();

            res.status(200).json({
                message: "Company Registered Successfully",
                newCompany
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
};


exports.companyLogin = async (req, res) => {
    console.log("Inside company login function");
    console.log(req.body);


    const { email, password } = req.body;

    try {
        const existingCompany = await Company.findOne({ email });

        if (existingCompany) {

            if (password == existingCompany.password) {

                const token = jwt.sign(
                    {
                        userMail: existingCompany.email,
                        role: existingCompany.role
                    },
                    process.env.jwtKey,
                    { expiresIn: "1d" }
                );

                res.status(200).json({
                    message: "Company Login Successfully",
                    existingCompany,
                    token
                });

            } else {
                res.status(401).json({
                    message: "Password is incorrect"
                });
            }

        } else {
            res.status(401).json({
                message: "Company not found"
            });
        }

    } catch (error) {
        console.error("COMPANY LOGIN ERROR:", error);
        res.status(500).json(error);
    }
};
// ================= GET USER PROFILE =================
exports.getUserProfile = async (req, res) => {
    try {
        const email = req.user.userMail;

        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// ================= UPDATE USER PROFILE =================

exports.updateUserProfile = async (req, res) => {
    try {
        const email = req.user.userMail; // from JWT
        const user = await User.findOne({ email }); // find by email
        if (!user) return res.status(404).json({ message: "User not found" });

        const { username, email: newEmail, phone } = req.body;
        if (username) user.username = username;
        if (newEmail) user.email = newEmail;
        if (phone) user.phone = phone;

        // handle profile image
        if (req.file) {
            if (user.profile) {
                const oldPath = path.join(__dirname, "..", "uploads", user.profile);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            user.profile = req.file.filename;
        }

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", data: user });
    } catch (err) {
        console.error("Update user error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// *for company register




// *admin block

// **postman correct
exports.updateAdmin = async (req, res) => {
    console.log("inside update Admin");

    const { username, password, bio } = req.body
    const email = req.payload; //* from middleware

    console.log("File uploaded:", req.file);
    console.log("Body received:", req.body);


    let updateProfile = undefined;

    if (req.file) {
        updateProfile = req.file.filename;  // *image name
    }

    try {
        const updateFields = { username, password, bio };

        if (updateProfile) {
            updateFields.profile = updateProfile;
        }

        const updatedAdmin = await User.findOneAndUpdate(
            { email },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json("Admin not found");
        }

        res.status(200).json({
            message: "Updated Successfully",
            updatedAdmin
        });

    } catch (err) {
        console.log(err);
        res.status(500).json("Error: " + err);
    }
};


// *postman correct
// *get Update Admin
exports.getAdmin = async (req, res) => {
    try {
        const admin = await User.findOne({ email: req.payload });
        if (!admin) return res.status(404).json("Admin not found");

        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json("Error: " + err);
    }
};

// ** get users



// *payment
exports.buyProduct = async (req, res) => {

    try {
        const { FormDetails, totalAmount } = req.body;
        const amount = totalAmount * 100;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: FormDetails.email,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: { name: "Product Purchase" },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-cancel",
        });

        // Return the full URL instead of sessionId
        res.status(200).json({
            success: true,
            checkoutUrl: session.url,  // <--- Stripe now provides session.url
        });

    } catch (err) {
        console.error("Stripe error:", err);
        res.status(500).json({ error: err.message });
    }
};


// *postman correct
// *admin side
exports.getUsers = async (req, res) => {
    try {
        const getUser = await User.find({ role: { $ne: "admin" } });

        res.status(200).json(getUser);

    } catch (err) {
        console.error("error", err);
        res.status(500).json({ error: err.message });
    }
};

