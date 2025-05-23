import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/job-posting/${id}`);
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOffer = async () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const userId = profile?._id;
  
    if (!userId) {
      setError('User not logged in. Please login to submit an offer.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/job-offers', {
        jobId: id,
        userId,
        message
      });
      setSuccess('Offer submitted successfully!');
      setError('');
      setShowForm(false);
      setMessage('');
    } catch (err) {
      console.error(err);
      setError('Failed to submit offer');
      setSuccess('');
    }
  };
  

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!job) return <div className="text-center mt-5">Job not found</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-4">
          {job.image && (
            <img
              src={job.image}
              alt="Job"
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
          <h4>{job.patient?.salutation} {job.patient?.firstName} {job.patient?.lastName}</h4>
        </div>

        <h5>Service Type:</h5>
        <p>{job.serviceType?.join(', ')}</p>

        <h5>Employment Type:</h5>
        <p>{job.jobDetails?.employmentType}</p>

        <h5>Availability:</h5>
        <ul>
          {job.jobDetails?.availability?.slots?.map((slot, i) => (
            <li key={i}>
              <strong>{slot.day}</strong>: 
              {Object.entries(slot.times)
                .filter(([_, val]) => val)
                .map(([time]) => ` ${time}`)}
            </li>
          ))}
        </ul>

        <h5>Working Hours:</h5>
        <p>
          {job.jobDetails?.workingHours?.expectedHours} - {job.jobDetails?.workingHours?.billingType}
        </p>

        <h5>Job Start:</h5>
        <p>
          {job.jobDetails?.workStart?.type === 'fromDate'
            ? new Date(job.jobDetails.workStart.fromDate).toLocaleDateString()
            : 'ASAP'}
        </p>

        <h5>Location:</h5>
        <p>{job.location?.postalCode}, {job.location?.city}</p>

        <h5>Job Description:</h5>
        <p><strong>{job.jobDescription?.headline}</strong></p>
        <p>{job.jobDescription?.details}</p>

        <hr />

        {/* Submit Job Offer Section */}
        <div className="text-center">
            
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel Offer' : 'Submit Job Offer'}
          </button>

          {showForm && (
            <div className="mt-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your proposal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn btn-success mt-2"
                onClick={handleSubmitOffer}
              >
                Send Offer
              </button>
              
            </div>
          )}

          {success && <p className="text-success mt-2">{success}</p>}
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
