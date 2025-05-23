import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeTab from "./home";
import ProfileDashboard from "./profile";
import ProfileViews from "./profile-view";
import UsersList from "../users/user";
import MyJobsPosted from "../employeer-dashboard/my-job";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    console.log("Stored Profile Data:", storedProfile); // ✅ Debugging
    setUserRole(storedProfile?.role || ""); // ✅ Extract role safely
  }, []);

  if (!userRole) {
    return <p>Loading user data...</p>; // ✅ Prevents crash if role is not loaded
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-navbar-dashboard">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item p-2">
                <button
                  className={`nav-link nav-buttons btn text-black ${activeTab === "home" ? "border-bottom border-dark" : ""}`}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item p-2">
                <button
                  className={`nav-link nav-buttons btn text-black ${activeTab === "favourites" ? "border-bottom border-dark" : ""}`}
                  onClick={() => setActiveTab("favourites")}
                >
                  Favourites
                </button>
              </li>
              <li className="nav-item p-2">
                <button
                  className={`nav-link nav-buttons btn text-black ${activeTab === "profile" ? "border-bottom border-dark" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  My Profile
                </button>
              </li>
              <li className="nav-item p-2">
                  <button
                    className={`nav-link nav-buttons btn text-black ${activeTab === "users" ? "border-bottom border-dark" : ""}`}
                    onClick={() => setActiveTab("users")}
                  >
                    Users
                  </button>
                </li>
              <li className="nav-item p-2">
                  <button
                    className={`nav-link nav-buttons btn text-black ${activeTab === "users" ? "border-bottom border-dark" : ""}`}
                    onClick={() => setActiveTab("myjob")}
                  >
                    My job
                  </button>
                </li>
              {/* ❌ Hide "My Profile Views" if role is "candidate" */}
              {userRole !== "candidate" && (
                <li className="nav-item p-2">
                  <button
                    className={`nav-link nav-buttons btn text-black ${activeTab === "views" ? "border-bottom border-dark" : ""}`}
                    onClick={() => setActiveTab("views")}
                  >
                    My Profile Views
                  </button>
                </li>
              )}
             
            </ul>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="container mt-4">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "favourites" && <h2>Favourites Content</h2>}
        {activeTab === "profile" && <ProfileDashboard />}
        {activeTab === "views" && <ProfileViews />}
        {activeTab === "users" && <UsersList />}
        {activeTab === "myjob" && <MyJobsPosted />}
      </div>
    </div>
  );
};

export default CandidateDashboard;