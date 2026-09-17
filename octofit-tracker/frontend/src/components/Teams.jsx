import { useState, useEffect } from 'react';
import { fetchData, postData } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/api/teams/');
      setTeams(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('/teams/', newTeam);
      setNewTeam({
        name: '',
        description: '',
      });
      await loadTeams();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading teams...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1>Teams</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Team</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newTeam.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={newTeam.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Create Team
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h3>Teams</h3>
          {teams.length === 0 ? (
            <p>No teams yet. Create one to get started!</p>
          ) : (
            <div className="row">
              {teams.map((team) => (
                <div key={team.id} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{team.name}</h5>
                      {team.description && (
                        <p className="card-text text-muted">
                          {team.description}
                        </p>
                      )}
                      <div className="text-muted small">
                        <p className="mb-1">
                          Members: {team.members_count || team.membersCount || 0}
                        </p>
                        <p className="mb-0">
                          Total Points:{' '}
                          {team.total_points || team.totalPoints || 0}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-outline-primary">
                        View Details
                      </button>
                    </div>
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
