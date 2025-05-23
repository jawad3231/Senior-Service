import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './AvailabilityInDays.css'; // 👈 we'll add custom styles here

const AvailabilityInDays = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = ['Pre Noon', 'Afternoon', 'Evening', 'Night'];

  const [availabilityDays, setAvailabilityDays] = useState(formData.availabilityDays || {});

  const handleNext = () => {
    setFormData(prev => ({ ...prev, availabilityDays }));
    navigate('/description');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="card-body">
          <h4 className="text-center mb-4">Select Your Availability</h4>
          <div className="availability-grid mb-4">
            <div className="label-cell"></div>
            {daysOfWeek.map((day, i) => (
              <div key={i} className="day-header">{day}</div>
            ))}
            {timeSlots.map((slot, i) => (
              <React.Fragment key={i}>
                <div className="time-label">{slot}</div>
                {daysOfWeek.map((day, j) => (
                  <div key={`${i}-${j}`} className="checkbox-cell">
                    <input
                      type="checkbox"
                      className="circle-checkbox"
                      checked={availabilityDays[day]?.includes(slot) || false}
                      onChange={() => {
                        setAvailabilityDays(prev => {
                          const updated = { ...prev };
                          if (!updated[day]) updated[day] = [];
                          if (updated[day].includes(slot)) {
                            updated[day] = updated[day].filter(s => s !== slot);
                          } else {
                            updated[day].push(slot);
                          }
                          return updated;
                        });
                      }}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <button className="btn btn-primary w-100" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityInDays;
