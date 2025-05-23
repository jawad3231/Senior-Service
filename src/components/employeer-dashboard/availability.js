import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailabilityCandidate = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [employmentType, setEmploymentType] = useState('');
  const [startDateOption, setStartDateOption] = useState('asap');
  const [selectedDate, setSelectedDate] = useState('');
  const [availability, setAvailability] = useState({});
  const [workingHours, setWorkingHours] = useState('');
  const [hourlyType, setHourlyType] = useState('');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

  useEffect(() => {
    const jd = formData?.jobDetails || {};
    const avail = jd.availability?.slots || [];
    const flatAvailability = {};

    avail.forEach(slot => {
      const shortDay = slot.day.slice(0, 3);
      times.forEach(time => {
        if (slot.times?.[time.toLowerCase()]) {
          flatAvailability[`${time}-${shortDay}`] = true;
        }
      });
    });

    setEmploymentType(jd.employmentType || '');
    setStartDateOption(jd.workStart?.type || 'asap');
    setSelectedDate(jd.workStart?.fromDate || '');
    setAvailability(flatAvailability);
    setWorkingHours(jd.workingHours?.expectedHours || '');
    setHourlyType(jd.workingHours?.billingType || '');
  }, [formData]);

  const toggleCheckbox = (time, day) => {
    const key = `${time}-${day}`;
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNext = () => {
    const slots = fullDays.map((day, index) => {
      const shortDay = days[index];
      const timeslot = {};
      times.forEach(time => {
        const key = `${time}-${shortDay}`;
        timeslot[time.toLowerCase()] = availability[key] || false;
      });
      return { day, times: timeslot };
    });

    const updatedData = {
      ...formData,
      jobDetails: {
        employmentType,
        workStart: {
          type: startDateOption,
          fromDate: startDateOption === 'from' ? selectedDate : null
        },
        availability: { slots },
        workingHours: {
          expectedHours: workingHours,
          billingType: hourlyType
        }
      }
    };

    setFormData(updatedData);
    localStorage.setItem('signupData', JSON.stringify(updatedData));
    navigate('/job-location');
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5">
      <h2 className="mb-4 text-center">Availability of Candidate</h2>

      <div className="mb-4 d-flex gap-3">
        {['Full-Time', 'Part-Time', 'Occasional'].map((type) => (
          <div
            key={type}
            className={`circle-option ${employmentType === type ? 'selected' : ''}`}
            onClick={() => setEmploymentType(type)}
          >
            {type}
          </div>
        ))}
      </div>

      <div className="mb-4 text-center">
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="startDateOption"
            id="asap"
            checked={startDateOption === 'asap'}
            onChange={() => setStartDateOption('asap')}
          />
          <label className="form-check-label" htmlFor="asap">
            As soon as possible
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="startDateOption"
            id="fromDate"
            checked={startDateOption === 'from'}
            onChange={() => setStartDateOption('from')}
          />
          <label className="form-check-label" htmlFor="fromDate">
            From this date
          </label>
        </div>
        {startDateOption === 'from' && (
          <input
            type="date"
            className="form-control mt-2 mx-auto"
            style={{ width: '200px' }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        )}
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-center mb-2 gap-2">
          {days.map(day => (
            <div key={day} className="text-center" style={{ width: '40px' }}>{day}</div>
          ))}
        </div>
        {times.map((time) => (
          <div key={time} className="d-flex justify-content-center mb-2 gap-2">
            {days.map(day => (
              <div
                key={`${time}-${day}`}
                className={`circle-checkbox ${availability[`${time}-${day}`] ? 'checked' : ''}`}
                onClick={() => toggleCheckbox(time, day)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <select
          className="form-select"
          style={{ width: '200px' }}
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
        >
          <option value="">Expected working hours</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(hour => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>

        <select
          className="form-select"
          style={{ width: '200px' }}
          value={hourlyType}
          onChange={(e) => setHourlyType(e.target.value)}
        >
          <option value="">Per Day / Per Hour</option>
          <option value="day">Per Day</option>
          <option value="hour">Per Hour</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleNext}>Next</button>

      <style>{`
        .circle-option {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #ccc;
          cursor: pointer;
          text-align: center;
        }
        .circle-option.selected {
          border-color: #0d6efd;
          background-color: #0d6efd;
          color: white;
        }
        .circle-checkbox {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid #ccc;
          cursor: pointer;
        }
        .circle-checkbox.checked {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default AvailabilityCandidate;
