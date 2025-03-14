// routes/jobRoutes
const express = require('express');
const { getJobs, createJob, getJobById, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(createJob);

router.route('/:id')
    .get(getJobById)
    .delete(deleteJob);

module.exports = router;
