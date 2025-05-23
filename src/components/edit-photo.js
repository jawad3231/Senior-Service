import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPhoto = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (formData.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(formData.photo);
    }
  }, [formData.photo]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Edit Photo</h2>
      <input type='file' className='form-control mb-3' accept='image/*' onChange={handleChange} />
      {preview && <img src={preview} alt='Preview' className='img-fluid mb-3' style={{ maxHeight: '200px' }} />}
      <button className='btn btn-primary mt-3' onClick={() => navigate('/other-details')}>Next</button>
    </div>
  );
};

export default EditPhoto;