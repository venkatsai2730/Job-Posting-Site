import React from 'react';
import '../styles/JobFilter.css';

const JobFilter = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e) => {
    const value = [0, parseInt(e.target.value, 10)]; // Min is 0, max is dynamic
    setFilters((prev) => ({ ...prev, salaryRange: value }));
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="title"
        placeholder="Search By Job Title, Role"
        value={filters.title || ''}
        onChange={handleInputChange}
        className="filter-input"
      />
      <input
        type="text"
        name="location"
        placeholder="Preferred Location"
        value={filters.location || ''}
        onChange={handleInputChange}
        className="filter-input"
      />
      <select
        name="jobType"
        value={filters.jobType || ''}
        onChange={handleInputChange}
        className="filter-select"
      >
        <option value="">Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <input
        type="range"
        name="salaryRange"
        min="0"
        max="100"
        value={filters.salaryRange ? filters.salaryRange[1] : 100}
        onChange={handleSalaryChange}
        className="salary-slider"
      />
      <span>Salary: ₹{filters.salaryRange ? filters.salaryRange[0] : 0}k - ₹{filters.salaryRange ? filters.salaryRange[1] : 100}k</span>
    </div>
  );
};

export default JobFilter;