import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareTypes, setSelectedCareTypes] = useState([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/job-posting');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        `${job.patient?.firstName} ${job.patient?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCareTypes.length > 0) {
      filtered = filtered.filter((job) =>
        job.serviceType?.some((type) =>
          selectedCareTypes.includes(type.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCareTypes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCareTypeChange = (e) => {
    const value = e.target.id;
    const checked = e.target.checked;

    if (checked) {
      setSelectedCareTypes((prev) => [...prev, value]);
    } else {
      setSelectedCareTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  if (loading) return <div className="text-center mt-5">Loading jobs...</div>;

  return (
    <div className="container mt-5 d-flex">
      {/* Sidebar */}
      <div className="border-end pe-3 me-4" style={{ width: '250px' }}>
        <h5>Filter</h5>

        {/* Search Input */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Max Distance Slider */}
        <div className="mb-3">
          <label htmlFor="distanceRange" className="form-label">
            Max Distance
          </label>
          <input
            type="range"
            className="form-range"
            id="distanceRange"
            min="0"
            max="100"
          />
        </div>

        {/* Type of Care Checkboxes */}
        <div className="mb-3">
          <label className="form-label">Type of Care</label>
          {['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Landscaping'].map((type) => (
            <div className="form-check" key={type}>
              <input
                className="form-check-input"
                type="checkbox"
                id={type.toLowerCase()}
                onChange={handleCareTypeChange}
              />
              <label className="form-check-label" htmlFor={type.toLowerCase()}>
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Load More Filters Button */}
        <button
          className="btn btn-sm btn-outline-secondary w-100"
          onClick={toggleMoreFilters}
        >
          {showMoreFilters ? 'Hide extra filters' : 'Load more filters'}
        </button>

        {showMoreFilters && (
          <div className="mt-3">
            {/* Keyword Input */}
            <div className="mb-3">
              <label className="form-label">Keyword</label>
              <input type="text" className="form-control" placeholder="Enter keyword" />
            </div>

            {/* With Photo Only Toggle */}
            <div className="d-flex align-items-center justify-content-between">
              <label className="form-label mb-0">With Photo only</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="photoOnlyToggle" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="flex-grow-1">
        <h2 className="mb-4">Job Listings</h2>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between border rounded p-3 mb-3 shadow-sm"
            >
              <div className="d-flex align-items-center">
                {job.image && (
                  <img
                    src={job.image}
                    alt="job"
                    className="rounded-circle me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <span>
                  {job.patient?.firstName} {job.patient?.lastName}
                </span>
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/job-posting/${job._id}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
