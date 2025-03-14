const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
    salaryRange: { type: Number, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    applicationDeadline: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);