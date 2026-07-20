import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts');
        setWorkouts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-body-secondary">Loading workouts...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id ?? workout.title}>
              <div className="border rounded p-3 h-100">
                <h3 className="h6">{workout.title ?? 'Untitled workout'}</h3>
                <p className="mb-1 text-body-secondary">User: {workout.user?.name ?? 'Unknown'}</p>
                <p className="mb-1">Goal: {workout.goal ?? 'N/A'}</p>
                <p className="mb-0">Intensity: <span className="text-capitalize">{workout.intensity ?? 'N/A'}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
