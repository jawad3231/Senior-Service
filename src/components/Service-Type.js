import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceTypeMultiSelect = ({ formData, setFormData }) => {
  const navigate = useNavigate();


 
  const serviceOptions = ['Domestic care', 'Nursing', 'Household and cooking', 'Night and picket services', 'Body care',
    'Leisure activities','Holiday companion','PC / technical help', 'Driving service and purchasing'
  ];

  const [selectedServices, setSelectedServices] = useState(formData.serviceType || []);

  // Retrieve and merge signup data when component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('signupData'));
    const token = localStorage.getItem('token');
    const username = savedData?.username || "";  // Get username from savedData or other source

    if (savedData) {
      setFormData(prev => ({ ...prev, ...savedData }));
      setSelectedServices(savedData.serviceType || []);
    }

    // Fetch user data using username from API
    if (username) {
      fetch(`http://localhost:5000/api/auth/getUserByUsername/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('API Response:', data); // Log the full API response for debugging

          // Assuming the response directly contains userId (not under a user object)
          if (data?.userId) {
            // Log the userId to ensure it's coming from the API
            console.log('userId from API:', data.userId);

            // Store userId in localStorage
            localStorage.setItem('userId', data.userId);
            // Store profileId (if needed; you can modify this if profileId is available in the response)
            // localStorage.setItem('profileId', data.profileId);

            // Log the saved values in localStorage for verification
            console.log('userId saved in localStorage:', localStorage.getItem('userId'));
          } else {
            console.log('User data not found in API response');
          }
        })
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [setFormData]);

  const handleSelect = (service) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleNext = () => {
    const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage
    const profileId = localStorage.getItem('profileId');  // Retrieve profileId from localStorage

    // Log userId and profileId before moving to next step
    console.log('userId before navigating:', userId);
    console.log('profileId before navigating:', profileId);

    const updatedData = {
      ...formData,
      serviceType: selectedServices,
      userId,  // Include userId in the payload
      profileId,  // Include profileId in the payload
    };

    // Log the payload being sent to the next page
    console.log('Payload being sent to next page:', updatedData);

    // Save the updated data in localStorage
    localStorage.setItem('signupData', JSON.stringify(updatedData));

    setFormData(updatedData);
    navigate('/availability');
  };

  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center">Select Service Types</h2>
        <hr />
        <div className="d-flex flex-wrap gap-2 justify-content-center w-50" style={{ margin: "auto" }}>
          {serviceOptions.map((service, index) => (
            // <span
            //   key={index}
            //   style={{ width: '40%', marginBottom: '10px', boxSizing: 'border-box' }}
            //   className={`new-style-icons m-1 rounded-2xl text-center cursor-pointer px-3 py-1 rounded-full inline-block ${selectedServices.includes(service) ? 'bg-primary text-white' : 'bg-light text-dark'}`}
            //   onClick={() => handleSelect(service)}
            // >
            //   {service} {selectedServices.includes(service) ? '✅' : ''}
            // </span>
            <span
              key={index}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid #ccc',
                display: 'inline-block',
                maxWidth: '100%',
              }}
              className={`m-1 cursor-pointer ${selectedServices.includes(service) ? 'bg-primary text-white' : 'bg-light text-dark'}`}
              onClick={() => handleSelect(service)}
            >
              {service} {selectedServices.includes(service) ? '✅' : ''}
            </span>
          ))}
        </div>
        <hr />
        <button className="btn btn-primary mt-4 w-20" style={{ float: "right" }} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ServiceTypeMultiSelect;
