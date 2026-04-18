const express = require("express");
const route = express.Router();

// Controllers
const controller = require("../Controller/controller");
const formController = require("../Controller/fromController");
const videoController = require("../Controller/VideoController");
const jobController = require("../Controller/jobController");
const productController = require("../Controller/productController");
const cartController = require("../Controller/cartController");

// Middlewares
const jwtmiddleware = require("../middleware/jwtmiddleware");
const adminjwtMiddleware = require("../middleware/adminjwtmiddleware");
const multerConfig = require("../middleware/multermiddleware");
const resumeMulterConfig = require("../middleware/resumeMulter");
const { seedProducts, createProduct, getProductById, updateProduct, deleteProduct, getProducts } = require("../Controller/newArrivals");



/* ======================================================
  USER AUTH
====================================================== */

route.post("/api/register", multerConfig.single("profile"), controller.userRegister);
route.post("/api/login", controller.userLogin);
route.post("/api/google-login", controller.GoogleLogin);



/* ======================================================
   COMPANY AUTH
====================================================== */

route.post("/api/company/register", controller.companyRegister);
route.post("/api/company/login", controller.companyLogin);



/* ======================================================
   USER PROFILE
====================================================== */

route.get("/api/user/profile", jwtmiddleware, controller.getUserProfile);

route.put(
  "/api/update-profile",
  jwtmiddleware,
  multerConfig.single("profile"),
  controller.updateUserProfile
);



/* ======================================================
   ADMIN
====================================================== */

route.put(
  "/api/update-admin",
  adminjwtMiddleware,
  multerConfig.single("profile"),
  controller.updateAdmin
);

route.get("/api/get-admin", adminjwtMiddleware, controller.getAdmin);

route.get("/api/getUser", adminjwtMiddleware, controller.getUsers);



/* ======================================================
   JOB MODULE
====================================================== */

route.post(
  "/api/company/add-job",
  jwtmiddleware,
  jobController.addJob
);

route.get(
  "/api/company/get-jobs",
  jwtmiddleware,
  jobController.getCompanyJobs
);

route.get("/api/jobs", jobController.getAllJobs);

route.get("/api/job/:id", jobController.getSingleJob);

route.delete(
  "/api/company/delete-job/:id",
  jwtmiddleware,
  jobController.deleteJob
);



/* ======================================================
JOB APPLICATION
====================================================== */

// Apply Job
route.post(
  "/api/apply-job",
  jwtmiddleware,
  resumeMulterConfig.array("resumes", 2),
  formController.applyJob
);

// User: My Applications
route.get(
  "/api/my-applications",
  jwtmiddleware,
  formController.getMyApplications
);

// Company: View Applicants
route.get(
  "/api/company/applicants",
  jwtmiddleware,
  formController.getCompanyApplicants
);

// Single Applicant Details
route.get(
  "/api/application/:id",
  jwtmiddleware,
  formController.getSingleApplicant
);

// Withdraw Application
route.delete(
  "/api/application/:id",
  jwtmiddleware,
  formController.withdrawApplication
);

// Company update status
route.put(
  "/api/application-status/:id",
  jwtmiddleware,
  jobController.updateApplicationStatus
);



/* ======================================================
   VIDEO MODULE
====================================================== */

route.post("/api/add-video", videoController.addVideo);
route.get("/api/all-videos", videoController.getVideos);
route.delete("/api/delete-video/:id", videoController.deleteVideo);



/* ======================================================
   PRODUCT MODULE
====================================================== */

route.get("/api/products", productController.getProducts);
route.get("/api/product/:id", productController.getSingleProduct);
route.post("/api/product/add", productController.addProduct);



/* ======================================================
   CART MODULE
====================================================== */

// CART
route.post("/api/cart/add", jwtmiddleware, cartController.addToCart);
route.get("/api/cart", jwtmiddleware, cartController.getCart);
route.delete("/api/cart/:id", jwtmiddleware, cartController.removeCart);

// PAYMENT
route.post("/api/makePayment", jwtmiddleware, controller.buyProduct);




// NEW ARRIVALS

// Get all new arrivals (filtered + sorted)
route.get("/api/newarrivals", getProducts);

// Get single new arrival
route.get("/api/newarrivals/:id", getProductById);

// Create new arrival (Admin)
route.post("/api/newarrivals", createProduct);

// Update new arrival (Admin)
route.put("/api/newarrivals/:id", updateProduct);

// Delete new arrival (Admin)
route.delete("/api/newarrivals/:id", deleteProduct);

// Seed products (optional)
route.post("/api/seed", seedProducts);


// NEW ARRIVALS

module.exports = route;