import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Qualification = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const educationOptions = [
    'High School',
    "Bachelor's Degree",
    "Master's Degree",
    'PhD'
  ];

  const qualificationOptions = [
    'Emergency aid training',
    'Nursing / care assistant SRK',
    'Care training',
    'Diploma nurse',
    'Dipl. Physiotherapist'
  ];

  // Initialize states from formData or defaults
  const [education, setEducation] = useState(formData.education || '');
  const [qualifications, setQualifications] = useState(formData.qualifications || []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setEducation(savedData.education || '');
      setQualifications(savedData.qualifications || []);
    }
  }, []);

  // Handle dropdown value change
  const handleEducationChange = (e) => {
    const selectedEducation = e.target.value;
    setEducation(selectedEducation);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (option) => {
    setQualifications(prev =>
      prev.includes(option)
        ? prev.filter(q => q !== option) // Uncheck
        : [...prev, option] // Check
    );
  };

  // Proceed to next form
  const handleNext = () => {
    const updatedData = { ...formData, education, qualifications };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData)); // Save once when moving to next step
    navigate('/language');
  };

  return (
    <div className="card p-4 w-50 max-w-md mx-auto card-border">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center">Qualification</h2>
        <div className="mb-4">
          <label htmlFor="education" className="form-label">Education</label>
          <select 
            id="education" 
            className="form-select" 
            value={education} 
            onChange={handleEducationChange}
          >
            <option value="">Select Education</option>
            {educationOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h4 className="mb-4">Qualifications</h4>
          {qualificationOptions.map((option, index) => (
            <div className="form-check checkbox-border mb-3" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`qualification-${index}`}
                checked={qualifications.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label className="form-check-label" htmlFor={`qualification-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mt-4 w-100" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Qualification;
