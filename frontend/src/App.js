import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import JobForm from './components/JobForm';
import { createJob, getJobs } from './services/api';
import './styles/App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs({});
        console.log('Fetched jobs:', data); // Debug log
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleCreateJobClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJobSubmit = async (data) => {
    try {
      const newJob = await createJob(data);
      console.log('Created job:', newJob); // Debug log
      setJobs((prevJobs) => [newJob, ...prevJobs]); // Add new job to the top
      handleCloseModal();
      alert('Job created successfully!');
    } catch (error) {
      alert('Failed to create job. Please try again.');
      console.error('Error creating job:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">🏢</div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Find Jobs</a></li>
            <li><a href="/talents">Find Talents</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li><a href="#" onClick={handleCreateJobClick} className="create-btn">Create Jobs</a></li>
          </ul>
        </nav>
        {error && <div className="error-message">{error}</div>}
        <Routes>
          <Route exact path="/" element={<JobListPage jobs={jobs} setJobs={setJobs} />} />
          <Route path="/jobs" element={<JobListPage jobs={jobs} setJobs={setJobs} />} />
        </Routes>
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
              <JobForm onSubmit={handleJobSubmit} onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;