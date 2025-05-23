import React from 'react';
import { useNavigate } from 'react-router-dom';

const Description = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };
  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
    <div className="card-body">
      <h2 className="text-xl text-center">Description </h2>
      <hr/>
    <div className='container mt-5'>
      <textarea className='form-control mb-4 pb-4' onChange={handleChange} value={formData.description} placeholder='Describe yourself...'></textarea>
      <hr/>
    
      <button className='btn btn-primary mt-4' style={{float:"right"}} onClick={() => navigate('/location')}>Next</button>
    </div>
    </div>
    </div>
  );
};

export default Description;