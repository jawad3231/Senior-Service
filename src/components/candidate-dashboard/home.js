import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const HomeTab = () => {
  const [visibility, setVisibility] = useState(false);
 

  const storedUser = JSON.parse(localStorage.getItem("profile")); // Get logged-in user
  console.log("",storedUser)
  const userId = storedUser._id; // Extract user ID
  
  const [isVisible, setIsVisible] = useState(true);

  // Fetch profile visibility status on component mount
  useEffect(() => {
    if (!userId) {
      console.error("Profile ID not found in localStorage.");
      return;
    }

    axios.get(`/api/profile/${userId}`)
      .then((response) => {
        setIsVisible(response.data.isVisible);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userId]);

  // Toggle visibility on backend
  const toggleVisibility = () => {
    if (!userId) {
      console.error("Cannot toggle visibility: Profile ID is missing.");
      return;
    }

    axios.patch(`http://localhost:5000/api/profile/${userId}/visibility`)
      .then((response) => {
        setIsVisible(response.data.isVisible);
      })
      .catch((error) => console.error("Error updating visibility:", error));
  };
  const handleToggleVisibility = () => {
    if (!storedUser) return;
   

    fetch(`http://localhost:5000/api/profile/${userId}/visibility`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setVisibility(data.isVisible);
      })
      .catch((err) => console.error("Error updating visibility:", err));
  };
  return (
    <div className="container mt-4">
      {/* Centered Heading */}
      <h1 className="text-center">Welcome {storedUser.username}</h1>

      {/* Search Section */}
      <div className="d-flex justify-content-center mt-4">
        <input type="text" className="form-control w-25 me-2" placeholder="Enter Postal Code" />
        <select className="form-select w-25 me-2">
          <option>5 KM</option>
          <option>10 KM</option>
          <option>20 KM</option>
        </select>
        <button className="btn btn-primary">Search</button>
      </div>

      {/* Main Content Section */}
      <div className="row mt-4">
        {/* 70% Section */}
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <h4>Verify your profile</h4>
            <p>Make your profile more trustworthy and increase your chances of finding suitable jobs. The verification is free and only takes a few minutes.</p>
            <a href="#">Learn more</a>
          </div>
          <div className="card p-3">
            <h4>Verify your profile</h4>
            <p>Make your profile more trustworthy and increase your chances of finding suitable jobs. The verification is free and only takes a few minutes.</p>
            <a href="#">Learn more</a>
          </div>
        </div>

        {/* 30% Section */}
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h4>Profile visibility</h4>
            <p>Your profile is visible to others</p>
            <div className="d-flex align-items-center">
              <img src="https://via.placeholder.com/50" alt="Profile" className="me-2" />
              <p>Profile Picture</p>
            </div>
            <hr />
            <p>Others can find and view your profile. Disable your profile visibility if you no longer want to be shown in the search results.</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={visibility}
                onChange={handleToggleVisibility}
              />
              <label className="form-check-label">Enable/Disable</label>
            </div>
          </div>

          {/* Review Section */}
          <div className="card p-3 border mb-3" style={{ borderColor: "#1b5599", borderRadius: "5px" }}>
            <h4>Review</h4>
            <div className="d-flex align-items-center">
              <div className="me-2">
                ⭐⭐⭐⭐⭐ <small>No Review</small>
              </div>
              <img src="https://via.placeholder.com/50" alt="Review Icon" className="ms-2" />
            </div>
            <p className="mt-2">Positive reviews will increase your future job prospects considerably.</p>
            <button className="btn w-100" style={{ color: "#1b5599", borderColor: "#1b5599", borderRadius: "5px", borderWidth: "2px" }}>
              Request Review
            </button>
          </div>

          {/* Membership Section */}
          <div className="card p-3 border" style={{ borderColor: "#1b5599", borderRadius: "5px" }}>
            <h4>Membership</h4>
            <div className="d-flex align-items-center">
              <p className="me-2">Basic Member</p>
              <img src="https://via.placeholder.com/50" alt="Membership Icon" className="ms-2" />
            </div>
            <hr />
            <h5>Become a premium member and benefit from these advantages:</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center"><img src="https://via.placeholder.com/20" alt="Icon" className="me-2" /> Advantage 1</li>
              <li className="d-flex align-items-center"><img src="https://via.placeholder.com/20" alt="Icon" className="me-2" /> Advantage 2</li>
              <li className="d-flex align-items-center"><img src="https://via.placeholder.com/20" alt="Icon" className="me-2" /> Advantage 3</li>
              <li className="d-flex align-items-center"><img src="https://via.placeholder.com/20" alt="Icon" className="me-2" /> Advantage 4</li>
              <li className="d-flex align-items-center"><img src="https://via.placeholder.com/20" alt="Icon" className="me-2" /> Advantage 5</li>
            </ul>
            <button className="btn w-100 text-white" style={{ backgroundColor: "#1b5599" }}>
              <img src="https://via.placeholder.com/20" alt="Crown Icon" className="me-2" /> Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;