import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/JobForm.css';

const schema = yup.object().shape({
  title: yup.string().required('Job Title is required'),
  company: yup.string().required('Company Name is required'),
  location: yup.string().required('Location is required'),
  jobType: yup.string().required('Job Type is required'),
  salaryRange: yup.number().required('Salary Range is required').positive(),
  description: yup.string().required('Description is required'),
  requirements: yup.string().required('Requirements are required'),
  responsibilities: yup.string().required('Responsibilities are required'),
  applicationDeadline: yup.date().required('Application Deadline is required'),
});

const JobForm = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const handleDateChange = (date) => {
    setValue('applicationDeadline', date);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Job Opening</h2>
      <input {...register('title')} placeholder="Job Title" className="form-input" />
      {errors.title && <p className="error">{errors.title.message}</p>}
      <input {...register('company')} placeholder="Company Name" className="form-input" />
      {errors.company && <p className="error">{errors.company.message}</p>}
      <input {...register('location')} placeholder="Location" className="form-input" />
      {errors.location && <p className="error">{errors.location.message}</p>}
      <select {...register('jobType')} className="form-select">
        <option value="">Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      {errors.jobType && <p className="error">{errors.jobType.message}</p>}
      <input {...register('salaryRange')} type="number" placeholder="Salary Range" className="form-input" />
      {errors.salaryRange && <p className="error">{errors.salaryRange.message}</p>}
      <textarea {...register('description')} placeholder="Job Description" className="form-textarea" />
      {errors.description && <p className="error">{errors.description.message}</p>}
      <textarea {...register('requirements')} placeholder="Requirements" className="form-textarea" />
      {errors.requirements && <p className="error">{errors.requirements.message}</p>}
      <textarea {...register('responsibilities')} placeholder="Responsibilities" className="form-textarea" />
      {errors.responsibilities && <p className="error">{errors.responsibilities.message}</p>}
      <DatePicker
        selected={new Date()}
        onChange={handleDateChange}
        className="form-input"
        placeholderText="Application Deadline"
      />
      {errors.applicationDeadline && <p className="error">{errors.applicationDeadline.message}</p>}
      <div className="form-buttons">
        <button type="button" className="save-btn" onClick={onClose}>Save Draft</button>
        <button type="submit" className="publish-btn">Publish</button>
      </div>
    </form>
  );
};

export default JobForm;