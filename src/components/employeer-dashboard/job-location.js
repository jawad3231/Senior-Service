import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobLocation = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [postalCode, setPostalCode] = useState('');
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    if (formData?.location) {
      setPostalCode(formData.location.postalCode || '');
      setCityName(formData.location.city || '');
    }
  }, [formData]);

  const handleNext = () => {
    const updatedData = {
      ...formData,
      location: {
        postalCode,
        city: cityName
      }
    };

    localStorage.setItem('signupData', JSON.stringify(updatedData));
    setFormData(updatedData);
    navigate('/patient-details'); // replace with your actual route
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5">
      <h2 className="mb-4 text-center">Location</h2>

      <div className="row w-100 justify-content-center">
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">City Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleNext}>Next</button>
    </div>
  );
};

export default JobLocation;
