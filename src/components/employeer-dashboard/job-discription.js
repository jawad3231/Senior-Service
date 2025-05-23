import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobDescription = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [headline, setHeadline] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Pre-fill if data already exists
    if (formData?.jobDescription) {
      setHeadline(formData.jobDescription.headline || '');
      setDetails(formData.jobDescription.details || '');
    }
  }, [formData]);

  const handleNext = () => {
    const updatedData = {
      ...formData,
      jobDescription: {
        headline,
        details
      }
    };

    localStorage.setItem('signupData', JSON.stringify(updatedData));
    setFormData(updatedData);
    navigate('/image-preview');
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5 w-100">
      <h2 className="mb-4 text-center">Job Description</h2>

      <div className="col-md-6 mb-3 w-50 mx-auto">
        <label className="form-label">Headline</label>
        <input
          type="text"
          className="form-control"
          placeholder="Write a short job headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>

      <div className="col-md-6 mb-3 w-50 mx-auto">
        <label className="form-label">Details</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Write detailed job description..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary mt-3 mx-auto d-block"
        onClick={handleNext}
        disabled={!headline || !details}
      >
        Next
      </button>
    </div>
  );
};

export default JobDescription;
