import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyJobsPosted = () => {
  const storedProfile = localStorage.getItem("profile");
  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
  const storedUserId = parsedProfile?._id || null;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!storedUserId) {
      setError("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job-posting/user/${storedUserId}`);
        setJobs(response.data.jobs); // response structure is: { success: true, jobs: [...] }
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [storedUserId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">My Posted Jobs</h2>
      <div className="row mt-3">
        {jobs.length === 0 ? (
          <div className="col-12 text-center">
            <p>You haven't posted any jobs yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job._id}>
              <div className="card p-3 mb-4">
                <h4 className="text-center">{job.jobDescription?.headline || "No Headline"}</h4>
                
                {/* Job Image Preview */}
                <div className="text-center mb-3">
                  {job.image ? (
                    <img
                      src={job.image}
                      alt="Job Image"
                      className="img-fluid"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        border: '2px solid #ddd',
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder Image"
                      className="img-fluid"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        border: '2px solid #ddd',
                      }}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <p><strong>Service Type:</strong> {job.serviceType?.join(", ")}</p>
                  <p><strong>Location:</strong> {job.location?.city}, {job.location?.postalCode}</p>
                  <p><strong>Employment Type:</strong> {job.jobDetails?.employmentType}</p>
                  <p><strong>Work Start:</strong> {job.jobDetails?.workStart?.type}</p>
                  <p><strong>Availability:</strong> {job.jobDetails?.availability?.slots?.map(slot => `${slot.day}: ${slot.times.morning ? 'Morning' : ''} ${slot.times.afternoon ? 'Afternoon' : ''} ${slot.times.evening ? 'Evening' : ''} ${slot.times.night ? 'Night' : ''}`).join(", ")}</p>
                </div>

                <div className="text-center">
                  <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyJobsPosted;
