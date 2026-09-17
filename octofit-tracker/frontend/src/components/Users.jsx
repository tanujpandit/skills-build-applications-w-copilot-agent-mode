import { useState, useEffect } from 'react';
import { fetchData, postData } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/users/');
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('/users/', newUser);
      setNewUser({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
      });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading users...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1>User Profiles</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Create User Profile</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Create Profile
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <h3>Users</h3>
          {users.length === 0 ? (
            <p>No users yet.</p>
          ) : (
            <div className="list-group">
              {users.map((user) => (
                <div key={user.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {user.first_name} {user.last_name || user.username}
                    </h5>
                    <small className="text-muted">@{user.username}</small>
                  </div>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <div className="text-muted small">
                    <p className="mb-1">
                      Activities:{' '}
                      {user.activities_count || user.activitiesCount || 0}
                    </p>
                    <p className="mb-0">
                      Points: {user.total_points || user.totalPoints || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
