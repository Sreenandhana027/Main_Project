const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'resumes');
        // ✅ Create folder if it doesn't exist (fixes Render issue)
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `RESUME-${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF/DOC/DOCX files are allowed"), false);
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});