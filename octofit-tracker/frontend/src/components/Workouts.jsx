import { useState, useEffect } from 'react';
import { fetchData, postData } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    difficulty: 'beginner',
    duration: '',
  });

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/api/workouts/');
      setWorkouts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('/workouts/', newWorkout);
      setNewWorkout({
        name: '',
        description: '',
        difficulty: 'beginner',
        duration: '',
      });
      await loadWorkouts();
    } catch (err) {
      setError(err.message);
    }
  };

  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success';
      case 'intermediate':
        return 'bg-warning';
      case 'advanced':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading workouts...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1>Personalized Workouts</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Create Workout</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newWorkout.name}
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
                    value={newWorkout.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">
                    Difficulty Level
                  </label>
                  <select
                    className="form-select"
                    id="difficulty"
                    name="difficulty"
                    value={newWorkout.difficulty}
                    onChange={handleInputChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
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
                    value={newWorkout.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Create Workout
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <h3>Available Workouts</h3>
          {workouts.length === 0 ? (
            <p>No workouts available yet.</p>
          ) : (
            <div className="row">
              {workouts.map((workout) => (
                <div key={workout.id} className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{workout.name}</h5>
                        <span
                          className={`badge ${getDifficultyBadgeClass(
                            workout.difficulty
                          )}`}
                        >
                          {workout.difficulty}
                        </span>
                      </div>
                      {workout.description && (
                        <p className="card-text text-muted mb-2">
                          {workout.description}
                        </p>
                      )}
                      <div className="text-muted small">
                        <p className="mb-1">
                          Duration: {workout.duration} minutes
                        </p>
                        <p className="mb-0">
                          Completions:{' '}
                          {workout.completion_count ||
                            workout.completionCount ||
                            0}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-outline-success">
                        Start Workout
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
