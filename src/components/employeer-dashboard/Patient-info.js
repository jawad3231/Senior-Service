import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientInfo = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [salutation, setSalutation] = useState(formData.salutation || '');
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [isCompany, setIsCompany] = useState(formData.isCompany || false);

  const handleNext = () => {
    const updatedData = {
      ...formData,
      patient: {
        salutation,
        firstName,
        lastName,
        representsCompany: isCompany
      }
    };
  
    setFormData(updatedData);
    localStorage.setItem('signupData', JSON.stringify(updatedData));
    navigate('/job-description'); // replace with actual next route
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5">
      <h2 className="mb-4 text-center">Patient Information</h2>

      {/* Salutation Chips */}
      <div className="mb-4 d-flex gap-3">
        {['Mr', 'Mrs'].map((title) => (
          <div
            key={title}
            className={`chip ${salutation === title ? 'selected' : ''}`}
            onClick={() => setSalutation(title)}
          >
            {title}
          </div>
        ))}
      </div>

      {/* Name Inputs */}
      <div className="row w-100 justify-content-center">
        <div className="col-md-4 mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Checkbox */}
      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="isCompany"
          checked={isCompany}
          onChange={() => setIsCompany(!isCompany)}
        />
        <label className="form-check-label" htmlFor="isCompany">
          I represent a company
        </label>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleNext}>Next</button>

      {/* Styles */}
      <style>{`
        .chip {
          padding: 12px 24px;
          border: 2px solid #ccc;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          user-select: none;
        }
        .chip.selected {
          background-color: #0d6efd;
          color: white;
          border-color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default PatientInfo;
