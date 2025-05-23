import React from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rate = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center p-4">What kind of job are you looking for?
        </h2>
        <hr/>
    <div className="container mt-5">
      <h2>Rate</h2>
      <div className="mb-3">
        <select className="form-select" name="rate" value={formData.rate} onChange={handleChange}>
          <option value="">Select Rate</option>
          <option value="Hourly">Hourly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <hr/>
      <button className="btn btn-primary" style={{float:"right"}} onClick={() => navigate('/qualification')}>Next</button>
    </div>
    </div>
    </div>
  );
};

export default Rate;
