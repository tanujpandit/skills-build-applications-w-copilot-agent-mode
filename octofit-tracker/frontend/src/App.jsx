import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <div className="mb-4">
            <img
              src="/docs/octofitapp-small.png"
              alt="Octofit Logo"
              style={{ maxWidth: '200px', marginBottom: '20px' }}
            />
          </div>
          <h1>Welcome to Octofit Tracker</h1>
          <p className="lead">
            Track your fitness activities, join teams, and compete on the leaderboard!
          </p>

          <div className="alert alert-info mt-4">
            <h5>Configuration Required</h5>
            <p className="mb-2">
              Before using this application, ensure you have configured the
              <code>VITE_CODESPACE_NAME</code> environment variable.
            </p>
            <p className="mb-0">
              Add it to your <code>.env.local</code> file:
              <br />
              <code>VITE_CODESPACE_NAME=your-codespace-name</code>
            </p>
          </div>

          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">📊 Log Activities</h5>
                  <p className="card-text">
                    Track your workouts and activities
                  </p>
                  <Link to="/activities" className="btn btn-primary">
                    Go to Activities
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">💪 Workouts</h5>
                  <p className="card-text">
                    Personalized workout suggestions
                  </p>
                  <Link to="/workouts" className="btn btn-primary">
                    Browse Workouts
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">
                    Manage user profiles
                  </p>
                  <Link to="/users" className="btn btn-primary">
                    View Users
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">
                    Compete with other fitness enthusiasts
                  </p>
                  <Link to="/leaderboard" className="btn btn-primary">
                    View Rankings
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">👨‍👩‍👧‍👦 Teams</h5>
                  <p className="card-text">
                    Create and join fitness teams
                  </p>
                  <Link to="/teams" className="btn btn-primary">
                    Manage Teams
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
