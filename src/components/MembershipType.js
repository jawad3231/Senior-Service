import React from 'react';
import { useNavigate } from 'react-router-dom';

const MembershipType = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, membershipType: e.target.value });
  };
  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
    <div className="card-body">
      <h2 className="text-xl mb-4 text-center p-4">Which kind of membership you want?</h2>
      <hr/>
    <div className='container mt-5'>
      <select className='form-select' onChange={handleChange} value={formData.membershipType}>
        <option value=''>Select Membership Type</option>
        <option value='Basic'>Basic</option>
        <option value='Premium'>Premium</option>
        <option value='VIP'>VIP</option>
      </select>
      <hr/>
      <button className='btn btn-primary mt-3' onClick={() => navigate('/other-details')}>Next</button>
    </div>
    </div>
    </div>
  );
};

export default MembershipType;