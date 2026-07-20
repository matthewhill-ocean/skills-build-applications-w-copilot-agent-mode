import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await fetchCollection('activities');
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-body-secondary">Loading activities...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Team</th>
                <th className="text-end">Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.user?.name}-${activity.loggedAt}`}>
                  <td>{activity.user?.name ?? 'Unknown'}</td>
                  <td className="text-capitalize">{activity.type ?? '-'}</td>
                  <td>{activity.team?.name ?? 'Unknown'}</td>
                  <td className="text-end">{activity.durationMinutes ?? 0} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
