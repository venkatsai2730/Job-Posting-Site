const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        let query = {};

        if (req.query.title) query.title = { $regex: req.query.title, $options: 'i' };
        if (req.query.location) query.location = { $regex: req.query.location, $options: 'i' };
        if (req.query.jobType) query.jobType = req.query.jobType;
        if (req.query.salaryRange) query.salaryRange = { $gte: parseInt(req.query.salaryRange.min), $lte: parseInt(req.query.salaryRange.max) };

        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Admin
const createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Admin
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getJobs, createJob, getJobById, deleteJob };