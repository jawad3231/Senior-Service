// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AvailabilityMultiSelect = ({ formData, setFormData }) => {
//   const navigate = useNavigate();

//   const availabilityOptions = [
//     'Part Time',
//     'Full Time'
//   ];

//   const [selectedAvailability, setSelectedAvailability] = useState(formData.availability || []);
//   const [isShortAvailability, setIsShortAvailability] = useState(formData.isShortAvailability || false);

//   const handleSelect = (option) => {
//     setSelectedAvailability(prev =>
//       prev.includes(option)
//         ? prev.filter(s => s !== option) // Deselect
//         : [...prev, option] // Select
//     );
//   };

//   const handleNext = () => {
//     // Store only Part Time / Full Time in availability
//     setFormData(prev => ({ 
//       ...prev, 
//       availability: selectedAvailability, 
//       isShortAvailability 
//     }));
//     navigate('/rate');
//   };

//   return (
//     <div className="card card-border p-4 w-50 max-w-md mx-auto">
//       <div className="card-body">
//         <h2 className="text-xl mb-4 text-center p-4">What kind of job are you looking for?</h2>
//         <hr />
//         <h2 className="text-xl m-4 text-center">Desired employment*</h2>
//         <div className="d-flex flex-wrap gap-2 justify-content-center" style={{ margin: "auto" }}>
//           {availabilityOptions.map((option, index) => (
//             <span
//               style={{ width: '20%', marginBottom: '10px', boxSizing: 'border-box' }}
//               key={index}
//               className={`new-style-icons cursor-pointer px-3 py-1 rounded-pill text-center ${selectedAvailability.includes(option) ? 'bg-primary text-white' : 'bg-light text-dark'}`}
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </span>
//           ))}
//         </div>
//         <h2 className="text-xl m-4 p-4 text-center">Short term availability</h2>
//         <div className="form-check mt-3 checkbox-border">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             id="availabilityCheckbox"
//             checked={isShortAvailability}
//             onChange={(e) => setIsShortAvailability(e.target.checked)}
//           />
//           <label className="form-check-label" htmlFor="availabilityCheckbox">
//             Yes
//           </label>
//         </div>
//         <div className='text-center text-sm pt-4'><p>* Mandatory field</p></div>
//         <button className="btn btn-primary mt-4 w-100" onClick={handleNext}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default AvailabilityMultiSelect;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailabilityMultiSelect = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const availabilityOptions = [
    'Part Time',
    'Full Time'
  ];

  const [selectedAvailability, setSelectedAvailability] = useState(formData.availability || []);
  const [isShortAvailability, setIsShortAvailability] = useState(formData.isShortAvailability || false);

  const handleSelect = (option) => {
    setSelectedAvailability(prev =>
      prev.includes(option)
        ? prev.filter(s => s !== option) // Deselect
        : [...prev, option] // Select
    );
  };

  const handleNext = () => {
    const userId = localStorage.getItem('userId');       // ✅ Get userId
    const profileId = localStorage.getItem('profileId'); // ✅ Get profileId

    setFormData(prev => ({ 
      ...prev, 
      availability: selectedAvailability, 
      isShortAvailability,
      userId,         // ✅ Save to formData
      profileId       // ✅ Save to formData
    }));

    navigate('/rate');
  };

  return (
    <div className="card card-border p-4 w-50 max-w-md mx-auto">
      <div className="card-body">
        <h2 className="text-xl mb-4 text-center p-4">What kind of job are you looking for?</h2>
        <hr />
        <h2 className="text-xl m-4 text-center">Desired employment*</h2>
        <div className="d-flex flex-wrap gap-2 justify-content-center" style={{ margin: "auto" }}>
          {availabilityOptions.map((option, index) => (
            <span
              style={{ width: '20%', marginBottom: '10px', boxSizing: 'border-box' }}
              key={index}
              className={`new-style-icons cursor-pointer px-3 py-1 rounded-pill text-center ${selectedAvailability.includes(option) ? 'bg-primary text-white' : 'bg-light text-dark'}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </span>
          ))}
        </div>
        <h2 className="text-xl m-4 p-4 text-center">Short term availability</h2>
        <div className="form-check mt-3 checkbox-border">
          <input
            className="form-check-input"
            type="checkbox"
            id="availabilityCheckbox"
            checked={isShortAvailability}
            onChange={(e) => setIsShortAvailability(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="availabilityCheckbox">
            Yes
          </label>
        </div>
        <div className='text-center text-sm pt-4'><p>* Mandatory field</p></div>
        <button className="btn btn-primary mt-4 w-100" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default AvailabilityMultiSelect;
