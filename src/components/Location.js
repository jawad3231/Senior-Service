import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Location = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData && savedData.location) {
      setFormData(prev => ({ ...prev, location: savedData.location }));
    }
  }, [setFormData]);

  // Handle input changes and update nested location object
  const handleChange = (e) => {
    const updatedLocation = {
      ...formData.location,
      [e.target.name]: e.target.value
    };

    const updatedData = { ...formData, location: updatedLocation };
    setFormData(updatedData);

    localStorage.setItem('formData', JSON.stringify(updatedData)); // Save data on change
  };

  // Proceed to next form
  const handleNext = () => {
    navigate('/personal-details');
  };

  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center p-4">Location</h2>
        <hr/>
        <div className='container mt-5'>
          <input 
            type='text' 
            className='form-control mb-3' 
            placeholder='Postal Code' 
            name='postalCode' 
            onChange={handleChange} 
            value={formData.location?.postalCode || ''} 
          />
          <input 
            type='text' 
            className='form-control mb-4' 
            placeholder='City' 
            name='city' 
            onChange={handleChange} 
            value={formData.location?.city || ''} 
          />
          <hr/>
          <button 
            className='btn btn-primary mt-4' 
            style={{float:"right"}} 
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
