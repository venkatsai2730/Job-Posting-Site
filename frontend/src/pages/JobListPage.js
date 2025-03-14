import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import JobFilter from '../components/JobFilters';
import '../styles/JobListPage.css';

const JobListPage = ({ jobs, setJobs }) => {
  const [filters, setFilters] = useState({ title: '', location: '', jobType: '', salaryRange: [0, 100] }); // Broader default range
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...jobs];
      console.log('Applying filters to jobs:', jobs); // Debug all jobs

      // Apply title filter
      if (filters.title) {
        result = result.filter(job => job.title.toLowerCase().includes(filters.title.toLowerCase()));
        console.log('After title filter:', result);
      }

      // Apply location filter
      if (filters.location) {
        result = result.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
        console.log('After location filter:', result);
      }

      // Apply jobType filter
      if (filters.jobType) {
        result = result.filter(job => job.jobType === filters.jobType);
        console.log('After jobType filter:', result);
      }

      // Apply salaryRange filter
      if (filters.salaryRange) {
        result = result.filter(job => {
          const jobSalary = job.salaryRange || 0; // Default to 0 if undefined
          return jobSalary >= filters.salaryRange[0] && jobSalary <= filters.salaryRange[1];
        });
        console.log('After salaryRange filter:', result, 'Range:', filters.salaryRange);
      }

      console.log('Filtered jobs:', result); // Final filtered result
      setFilteredJobs(result);
    };
    applyFilters();
  }, [filters, jobs]);

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job._id !== id));
  };

  return (
    <div className="job-list-page">
      <JobFilter filters={filters} setFilters={setFilters} />
      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))
        ) : (
          <div className="no-jobs">No jobs found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default JobListPage;