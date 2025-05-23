import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProfileForm = () => {
    const userProfile = JSON.parse(localStorage.getItem("profile"));

    const [formData, setFormData] = useState({
        userId: userProfile?._id || "",
        serviceType: '',
        availability: 'FullTime',
        rate: '',
        qualification: '',
        language: '',
        availabilityDays: [],
        description: '',
        location: '',
        firstName: '',
        lastName: '',
        birthday: '',
        membershipType: '',
        experience: '',
        referenceAvailability: true,
        driverLicense: false,
        carAvailability: false,
        photo: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhotoChange = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve userId from localStorage
        const userProfile = JSON.parse(localStorage.getItem("profile"));
        const userId = userProfile?._id; // Extract userId
        console.log("User ID before sending:", userId);
    
        if (!userId) {
            console.error("User ID is missing. Please log in again.");
            return;
        }
    
        // ✅ Add userId to formData
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(val => formDataToSend.append(`${key}[]`, val));
            } else if (typeof value === 'object' && value !== null) {
                formDataToSend.append(key, JSON.stringify(value)); // Send objects as JSON
            } else {
                formDataToSend.append(key, value);
            }
        });
    
        // ✅ Manually append userId
        formDataToSend.append("userId", userId);
    
        axios.post("http://localhost:5000/api/profile", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
            console.log("Success:", response.data);
        })
        .catch(error => {
            console.error("Error:", error.response?.data || error.message);
        });
    };
    
    

    return (
        <div className='container mt-5'>
            <div className='card p-4'>
                <h2 className='mb-4'>Profile Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='Service Type' name='serviceType' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label>Availability:</label><br />
                        <input type='radio' name='availability' value='FullTime' checked={formData.availability === 'FullTime'} onChange={handleChange} /> Full Time
                        <input type='radio' name='availability' value='PartTime' checked={formData.availability === 'PartTime'} onChange={handleChange} className='ms-3' /> Part Time
                    </div>
                    <div className='mb-3'>
                        <select className='form-select' name='rate' onChange={handleChange}>
                            <option value=''>Select Rate</option>
                            <option value='Hourly'>Hourly</option>
                            <option value='Monthly'>Monthly</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <textarea className='form-control' placeholder='Description' name='description' onChange={handleChange}></textarea>
                    </div>
                    <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='Location' name='location' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='First Name' name='firstName' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='Last Name' name='lastName' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type='date' className='form-control' placeholder='Birthday' name='birthday' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='Experience' name='experience' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type='file' className='form-control' name='photo' onChange={handlePhotoChange} />
                    </div>
                    <div className='mb-3'>
                        <select className='form-select' name='membershipType' onChange={handleChange} required>
                            <option value=''>Select Membership Type</option>
                            <option value='Basic'>Basic</option>
                            <option value='Premium'>Premium</option>
                        </select>
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input' name='driverLicense' onChange={handleChange} /> Driver License
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input' name='carAvailability' onChange={handleChange} /> Car Availability
                    </div>
                    <button type='submit' className='btn btn-primary mt-3'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
