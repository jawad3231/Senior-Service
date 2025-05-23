import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
    <div className="card-body">
      <h2 className="text-xl mb-4 text-center p-4">Personal Details</h2>
      <hr/>
    <div className='container mt-5'>
      <input type='text' className='form-control mb-3' placeholder='First Name' name='firstName' onChange={handleChange} value={formData.firstName} />
      <hr/>
      <input type='text' className='form-control mb-3' placeholder='Last Name' name='lastName' onChange={handleChange} value={formData.lastName} />
      <hr/>
      <input type='date' className='form-control mb-3' placeholder='Birthday' name='birthday' onChange={handleChange} value={formData.birthday} />
      <hr/>
      <button className='btn btn-primary mt-3' style={{float:"right"}} onClick={() => navigate('/membership-type')}>Next</button>
    </div>
    </div>
    </div>
  );
};

export default PersonalDetails;