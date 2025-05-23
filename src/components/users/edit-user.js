import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    role: '',
    isBlocked: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('⚠️ Failed to fetch user data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/${id}`, user);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500); // Redirect to user list
    } catch (err) {
      setError('⚠️ Failed to update user');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit User</h2>

      {loading && <div className="spinner-border text-primary"></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">✅ User updated successfully!</div>}

      {!loading && (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="username" value={user.username} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" value={user.role} onChange={handleChange} className="form-control">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <input type="text" value={user.isBlocked ? 'Blocked' : 'Active'} className="form-control" readOnly />
          </div>

          <button type="submit" className="btn btn-success">Save Changes</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
