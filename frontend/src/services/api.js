import axios from 'axios';

// Access API_URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

export const getJobs = async (filters) => {
  const params = { ...filters };
  if (filters.salaryRange) {
    params.salaryRange = { min: filters.salaryRange[0], max: filters.salaryRange[1] };
  }
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
