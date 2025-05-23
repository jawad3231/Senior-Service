import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileViews = () => {
  // Mock data for profile views
  const profileViews = [
    { name: "Patrik", location: "5500 Munich", lastViewed: "10.03.2025" },
    { name: "Marlene", location: "5500 Munich", lastViewed: "10.03.2025" },
    { name: "Miriam", location: "5500 Munich", lastViewed: "10.03.2025" },
    { name: "Ruan", location: "5500 Munich", lastViewed: "10.03.2025" },
  ];

  return (
    <div className="container mt-4">
      {/* Page Title */}
      <h2 className="fw-bold">My profile views</h2>

      {/* Premium Info Section */}
      <div className="alert alert-light border mt-3">
        <i className="bi bi-info-circle me-2"></i>
        After becoming a <strong className="text-primary">premium member</strong>, everyone who visits your profile will be shown here.
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Profile Views List */}
          {profileViews.map((profile, index) => (
            <div key={index} className="d-flex align-items-center p-3 border rounded bg-white mb-3">
              <div className="me-3">
                <div className="bg-secondary rounded-circle" style={{ width: 50, height: 50 }}></div>
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1">{profile.name} from Seniorservice24</h5>
                <p className="text-muted mb-1">{profile.location}</p>
                <p className="text-muted small">Last viewed {profile.lastViewed}</p>
              </div>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                See profile
              </button>
            </div>
          ))}
        </div>

        {/* Premium Upgrade Section */}
        <div className="col-lg-4">
          <div className="p-3 border rounded bg-white">
            <h5>Who has visited your profile?</h5>
            <p className="text-muted small">
              As a <strong>premium member</strong>, you can see who has visited your profile and contact them directly.
            </p>
            <button className="btn btn-primary w-100">Upgrade to premium</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViews;
