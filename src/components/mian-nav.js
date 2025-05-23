import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function MainNav() {
  const { user, token, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/candidate-dashboard");
  };

  const handleMessagesClick = () => {
    // Get the role from localStorage
    const profile = JSON.parse(localStorage.getItem('profile'));

    // Get the role from the profile object
    const role = profile ? profile.role : null; // null if profile or role is not found
    
    
    // Check role and redirect to the appropriate chat page
    if (role === "candidate") {
      navigate("/candidate-chat"); // Redirect to candidate's chat page
    } else {
      navigate("/chat"); // Redirect to employer's chat page
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search field
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Left Side: Logo */}
          <Link to="/home" className="navbar-brand">
            <img
              src="https://seniorservice24.ch/images/seniorservice24/logo.svg"
              alt="Logo"
              style={{ height: "40px" }}
            />
          </Link>

          {/* Center: Search Bar */}
          <div className="mx-auto" style={{ width: "35%" }}>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Search person or job..."
                value={searchQuery}
                onChange={handleSearchChange} // Update the search query on input change
              />
              <button className="btn btn-primary btn-sm" type="button">
                Search
              </button>
              {/* Clear Button with Primary Color */}
             
            </div>
          </div>

          {/* Right Side: Login/Profile/Logout */}
          <div className="d-flex align-items-center">
            {!token ? (
              <>
                <Link to="/login" className="btn btn-outline-secondary me-2 btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Signup
                </Link>
              </>
            ) : (
              <>
                {user?.role === "candidate" && (
                  <span className="me-3">Candidate</span>
                )}
                <button
                  type="button"
                  className="btn btn-link text-dark me-3"
                  onClick={handleProfileClick}
                >
                  <i className="bi bi-person-circle" style={{ fontSize: "1.8rem" }}></i>
                </button>
                {/* Messages Button */}
                <button
                className="btn btn-primary me-3 btn-sm" // Primary color button
                type="button"
                onClick={handleMessagesClick} // Clears the search query
              >
                Messages
              </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNav;
