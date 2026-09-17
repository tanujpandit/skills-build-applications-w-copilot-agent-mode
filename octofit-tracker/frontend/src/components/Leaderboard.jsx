import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/api/leaderboard/');
      setLeaderboard(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading leaderboard...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1>Competitive Leaderboard</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {leaderboard.length === 0 ? (
        <div className="alert alert-info">
          No leaderboard data available yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    <span className="badge bg-primary">{index + 1}</span>
                  </td>
                  <td>
                    <strong>{entry.user || entry.username || 'Unknown'}</strong>
                  </td>
                  <td>{entry.points || 0}</td>
                  <td>{entry.activities_count || entry.activitiesCount || 0}</td>
                  <td>{entry.total_calories || entry.totalCalories || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-secondary mt-3" onClick={loadLeaderboard}>
        Refresh Leaderboard
      </button>
    </div>
  );
}
