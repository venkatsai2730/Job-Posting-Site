import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job, onDelete }) => {
  // List of random placeholder logos using placehold.co
  const placeholderLogos = [
    'https://placehold.co/40x40/FF6F61/FFFFFF?text=C', // Coral placeholder
    'https://placehold.co/40x40/83C5BE/FFFFFF?text=L', // Teal placeholder
    'https://placehold.co/40x40/004D40/FFFFFF?text=O', // Dark teal placeholder
    'https://placehold.co/40x40/FAD0C4/FFFFFF?text=G', // Peach placeholder
    'https://placehold.co/40x40/007BFF/FFFFFF?text=P', // Blue placeholder
  ];

  // Function to select a random placeholder logo
  const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * placeholderLogos.length);
    return placeholderLogos[randomIndex];
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img
          src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
          alt={`${job.company} logo`}
          className="company-logo"
          onError={(e) => {
            e.target.onerror = (e) => {
              // If placeholder also fails, use a base64-encoded fallback (tiny transparent image)
              e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              e.target.alt = 'Logo unavailable';
            };
            e.target.src = getRandomLogo(); // Use a random placeholder logo on Clearbit error
          }}
        />
        <span className="job-time">24h Ago</span>
      </div>
      <h3>{job.title}</h3>
      <div className="job-details">
        <span>💼 {job.jobType}</span>
        <span>📍 {job.location}</span>
        <span>💰 {job.salaryRange} LPA</span>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="button-container">
        <button className="apply-btn">Apply Now</button>
       
      </div>
    </div>
  );
};

export default JobCard;
