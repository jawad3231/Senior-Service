import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoUpload = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file change and preview
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to API
  const handleSubmit = async () => {
    setLoading(true);

    // Create FormData object for multipart/form-data request
    const dataToSend = new FormData();
    for (let key in formData) {
      if (key === 'photo' && formData.photo) {
        dataToSend.append('photo', formData.photo); // Append photo file
      } else if (typeof formData[key] === 'object') {
        // If nested object (e.g., location), convert to JSON string
        dataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        alert('Profile created successfully!');
        navigate('/success'); // Redirect on success
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Upload Photo</h2>
      <input 
        type='file' 
        className='form-control mb-3' 
        accept='image/*' 
        onChange={handleChange} 
      />
      {preview && <img src={preview} alt='Preview' className='img-fluid mb-3' style={{ maxHeight: '200px' }} />}
      <button 
        className='btn btn-primary mt-3' 
        onClick={handleSubmit} 
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </div>
  );
};

export default PhotoUpload;
