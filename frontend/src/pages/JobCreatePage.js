import React from 'react';
import JobForm from '../components/JobForm';
import { createJob } from '../services/api';
import '../styles/JobCreatePage.css';

const JobCreatePage = () => {
  const handleSubmit = async (data) => {
    await createJob(data);
    alert('Job created successfully!');
  };

  return (
    <div className="job-create-page">
      <JobForm onSubmit={handleSubmit} />
    </div>
  );
};

export default JobCreatePage;