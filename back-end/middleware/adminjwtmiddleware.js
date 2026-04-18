const jwt = require('jsonwebtoken')

const adminjwtMiddleware = (req, res, next) => {
    console.log("Inside adminjwt middleware");

    if (!req.headers.authorization) {
        return res.status(401).json("No token found");
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const jwtVerification = jwt.verify(token, process.env.jwtKey);
        console.log(jwtVerification);

        req.payload = jwtVerification.userMail;
        req.role = jwtVerification.role;

        if (req.role !== "admin") {
            return res.status(403).json("Authorization failed...only access for Admin");
            console.log(decoded);

        }

        next(); // proceed only if admin
    }
    catch (err) {
        return res.status(401).json("Authorization error: " + err);
    }
};

module.exports = adminjwtMiddleware;
