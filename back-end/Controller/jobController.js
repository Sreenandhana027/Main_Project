const Job = require("../models/jobs");
const Application = require("../models/forms")
const Company = require("../models/companymodel")

//  ADD JOB (Company Panel)
exports.addJob = async (req, res) => {
    try {
        const { title, department, location, salary, experience, type, description } = req.body;

        if (!title || !department || !location || !salary || !experience || !type || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        //  Get company details from DB
        const company = await Company.findOne({ email: req.user.userMail });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        //  Add companyName here
        const newJob = new Job({
            companyEmail: req.user.userMail,
            companyName: company.companyName,
            title,
            department,
            location,
            salary,
            experience,
            type,
            description
        });

        await newJob.save();

        res.status(200).json({
            message: "Job Added Successfully",
            newJob
        });

    } catch (error) {
        console.log("Add job error:", error);
        res.status(500).json({ message: error.message });
    }
};


// GET COMPANY JOBS (Only logged company jobs)
exports.getCompanyJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            companyEmail: req.user.userMail
        });

        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json(error);
    }
};



// GET ALL JOBS (User Panel)
exports.getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find();

        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json(error);
    }
};



// GET SINGLE JOB (Job Details Page)
exports.getSingleJob = async (req, res) => {

    const { id } = req.params;

    try {

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json("Job not found");
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json(error);
    }
};


// DELETE JOB
exports.deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const deleted = await Job.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job Deleted Successfully" });
    } catch (error) {
        console.log("Delete job error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateApplicationStatus = async (req, res) => {

    if (req.user.role !== "company") {
        return res.status(403).json({
            success: false,
            message: "Only company can update status"
        });
    }

    try {

        const { id } = req.params;
        const { status } = req.body;

        const updated = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
