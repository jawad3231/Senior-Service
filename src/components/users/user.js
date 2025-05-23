import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('⚠️ Failed to fetch users');
      setLoading(false);
    }
  };

  // Edit user
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/user/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError('⚠️ Failed to delete user');
      }
    }
  };

  // Block/Unblock user
  const handleBlockUnblock = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/user/${id}/block`);
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBlocked: response.data.isBlocked } : user
      ));
    } catch (err) {
      setError('⚠️ Failed to update user status');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge ${user.isBlocked ? 'bg-danger' : 'bg-success'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user._id)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(user._id)}>
                    🗑️ Delete
                  </button>
                  <button
                    className={`btn btn-${user.isBlocked ? 'success' : 'warning'} btn-sm`}
                    onClick={() => handleBlockUnblock(user._id)}
                  >
                    {user.isBlocked ? '🔓 Unblock' : '🔒 Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
