import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUploadPreview = ({ formData, setFormData }) => {
  const [imagePreview, setImagePreview] = useState(formData.image || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Update formData with the new image data (base64 string)
        setFormData({
          ...formData,
          image: reader.result, // Save base64 string
        });
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // ✅ Always pull from localStorage
  
    const {
      serviceType,
      jobDetails,
      location,
      patient,
      jobDescription,
      image,
    } = formData;
  
    const finalData = {
      serviceType,
      jobDetails,
      location,
      patient,
      jobDescription,
      image,
      userId, // ✅ Correct and included
    };
  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/job-posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });
  
      if (response.ok) {
        localStorage.removeItem('signupData');
        alert('Job posted successfully!');
        navigate('/success');
      } else {
        alert('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5 w-100">
      <h2 className="mb-4 text-center">Upload Image</h2>

      <div className="mb-4 text-center">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {imagePreview && (
        <div className="text-center">
          <h5>Image Preview</h5>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{
              width: '300px', // Medium size preview
              height: 'auto',
              borderRadius: '8px',
              border: '2px solid #ccc',
            }}
          />
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
        disabled={loading || !imagePreview} // Disable button if no image or while loading
      >
        {loading ? 'Posting...' : 'Submit'}
      </button>

      <style>{`
        .form-control {
          width: 250px;
        }
      `}</style>
    </div>
  );
};

export default ImageUploadPreview;
