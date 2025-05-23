import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OtherDetails = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData && savedData.otherDetails) {
      setFormData(prev => ({ ...prev, otherDetails: savedData.otherDetails }));
    } else {
      // Initialize checkboxes as false if not already set
      setFormData(prev => ({
        ...prev,
        otherDetails: {
          ...prev.otherDetails,
          referenceAvailability: false,
          driverLicense: false,
          carAvailability: false
        }
      }));
    }
  }, [setFormData]);

  // Handle input changes and update nested otherDetails object
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const updatedOtherDetails = {
      ...formData.otherDetails,
      [name]: type === 'checkbox' ? checked : value
    };

    const updatedData = { ...formData, otherDetails: updatedOtherDetails };
    setFormData(updatedData);

    localStorage.setItem('formData', JSON.stringify(updatedData)); // Save data on change
  };

  // Proceed to next form
  const handleNext = () => {
    navigate('/photo-upload');
  };

  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center p-4">Other Details</h2>
        <hr/>
        <div className='container mt-5'>
          <input 
            type='text' 
            className='form-control mb-3' 
            placeholder='Experience' 
            name='experience' 
            onChange={handleChange} 
            value={formData.otherDetails?.experience || ''} 
          />
          <div className='form-check checkbox-border mb-3'>
            <input 
              className='form-check-input' 
              type='checkbox' 
              name='referenceAvailability' 
              onChange={handleChange} 
              checked={formData.otherDetails?.referenceAvailability || false} 
            />
            <label className='form-check-label'>Reference Availability</label>
          </div>
          <div className='form-check checkbox-border mb-3'>
            <input 
              className='form-check-input' 
              type='checkbox' 
              name='driverLicense' 
              onChange={handleChange} 
              checked={formData.otherDetails?.driverLicense || false} 
            />
            <label className='form-check-label'>Driver License</label>
          </div>
          <div className='form-check checkbox-border mb-3'>
            <input 
              className='form-check-input' 
              type='checkbox' 
              name='carAvailability' 
              onChange={handleChange} 
              checked={formData.otherDetails?.carAvailability || false} 
            />
            <label className='form-check-label'>Car Availability</label>
          </div>
          <hr/>
          <button 
            className='btn btn-primary mt-3' 
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

export default OtherDetails;
