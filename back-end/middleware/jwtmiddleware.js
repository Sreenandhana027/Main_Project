const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT Middleware");

    try {

        // 1️Get Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // 2️ Check Bearer Token Format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        // 3️Extract Token
        const token = authHeader.split(" ")[1];

        // 4️ Verify Token
        const decoded = jwt.verify(token, process.env.jwtKey);

        console.log("Decoded Token:", decoded);
        console.log("JWT KEY:", process.env.jwtKey);

        // 5️ Attach user info to request
        req.user = decoded;

        /*
        Example decoded:
        {
        email: "user@gmail.com",
        role: "user"
        }
        */

        next();

    } catch (error) {

        console.error("JWT Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }
};

module.exports = jwtMiddleware;