import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Language = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const serviceOptions = [
    'Chinese',
    'English',
    'Portuguese',
    'French',
    'German',
    'Italian',
    'British'
  ];

  // Initialize state from formData or set to empty array
  const [selectedServices, setSelectedServices] = useState(formData.languages || []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData && savedData.languages) {
      setSelectedServices(savedData.languages);
    }
  }, []);

  // Handle language selection
  const handleSelect = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service) // Deselect
        : [...prev, service] // Select
    );
  };

  // Proceed to next form
  const handleNext = () => {
    const updatedData = { ...formData, languages: selectedServices };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData)); // Save once when moving to next step
    navigate('/availableDays');
  };

  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl text-center">Which languages do you speak? </h2>
        <p className='text-center mb-4'>Please only select languages in which you can communicate confidently.</p>
        <hr/>
        <div className="d-flex flex-wrap gap-2 justify-content-center w-50" style={{ margin: "auto" }}>
          {serviceOptions.map((service, index) => (
            <span
              style={{ width: '40%', marginBottom: '10px', boxSizing: 'border-box' }}
              key={index}
              className={`new-style-icons m-1 rounded-2xl text-center cursor-pointer px-3 py-1 rounded-full inline-block ${selectedServices.includes(service) ? 'bg-primary text-white' : 'bg-light text-dark'}`}
              onClick={() => handleSelect(service)}
            >
              {service}
            </span>
          ))}
        </div>
        <button className="btn btn-primary mt-4 w-100" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Language;
