const Application = require('../models/forms');
const Job = require("../models/jobs");
const Company = require("../models/companymodel")

// *postman correct

// * add user details in the company form
exports.applyJob = async (req, res) => {
  if (req.user.role.toLowerCase().trim() !== "app  users") {
    return res.status(403).json({
      message: "Only users can apply for jobs"
    });
  }
  console.log("Role:", req.user.role);
  console.log("Email:", req.user.userMail);
  try {

    const { name, location, portfolio, coverletter, jobId } = req.body;

    const usermail = req.user.userMail;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json("Job not found");
    }

    const resume = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const existingApplication = await Application.findOne({
      jobId,
      usermail
    });

    if (existingApplication) {
      return res.status(400).json("You already applied for this job");
    }

    const newApplication = new Application({
      jobId,
      companyEmail: job.companyEmail,
      companyName: job.companyName,
      usermail,
      name,
      location,
      portfolio,
      coverletter,
      resume
    });

    await newApplication.save();

    res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// **postman correct

exports.getCompanyApplicants = async (req, res) => {
  try {

    const companyEmail = req.user.userMail;

    const applicants = await Application
      .find({ companyEmail })
      .populate("jobId");

    res.status(200).json({
      success: true,
      data: applicants
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// GET SINGLE APPLICANT
exports.getSingleApplicant = async (req, res) => {

  try {

    const { id } = req.params;

    const applicant = await Application
      .findById(id)
      .populate("jobId");

    if (!applicant) {
      return res.status(404).json("Applicant not found");
    }

    res.status(200).json(applicant);

  } catch (err) {

    res.status(500).json(err.message);

  }

};
exports.getMyApplications = async (req, res) => {
  try {

    const email = req.user.userMail;

    const applications = await Application
      .find({ usermail: email })
      .populate("jobId");

    res.status(200).json({
      success: true,
      data: applications
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

exports.withdrawApplication = async (req, res) => {
  try {

    const { id } = req.params;
    const email = req.user.userMail;

    const application = await forms.findOneAndDelete({
      _id: id,
      usermail: email
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

