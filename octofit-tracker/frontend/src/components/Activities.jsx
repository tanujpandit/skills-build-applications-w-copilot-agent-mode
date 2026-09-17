import { useState, useEffect } from 'react';
import { fetchData, postData } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    duration: '',
    calories: '',
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/activities/');
      setActivities(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('/activities/', newActivity);
      setNewActivity({
        name: '',
        description: '',
        duration: '',
        calories: '',
      });
      await loadActivities();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading activities...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1>Activities</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <h3>Log Activity</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Activity Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newActivity.name}
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
                value={newActivity.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={newActivity.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="calories" className="form-label">
                Calories Burned
              </label>
              <input
                type="number"
                className="form-control"
                id="calories"
                name="calories"
                value={newActivity.calories}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log Activity
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h3>Recent Activities</h3>
          {activities.length === 0 ? (
            <p>No activities recorded yet.</p>
          ) : (
            <ul className="list-group">
              {activities.map((activity) => (
                <li key={activity.id} className="list-group-item">
                  <h5>{activity.name}</h5>
                  <p className="mb-1">
                    <strong>Duration:</strong> {activity.duration} minutes
                  </p>
                  <p className="mb-1">
                    <strong>Calories:</strong> {activity.calories}
                  </p>
                  {activity.description && (
                    <p className="mb-0 text-muted">{activity.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
