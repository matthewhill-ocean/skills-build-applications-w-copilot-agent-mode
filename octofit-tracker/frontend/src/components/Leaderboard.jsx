import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard');
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-body-secondary">Loading leaderboard...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <ol className="list-group list-group-numbered">
          {leaderboard.map((entry) => (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={entry._id ?? `${entry.team?.name}-${entry.rank}`}>
              <div className="ms-2 me-auto">
                <div className="fw-semibold">{entry.team?.name ?? 'Unknown Team'}</div>
                <span className="text-body-secondary">Period: {entry.period ?? 'N/A'}</span>
              </div>
              <span className="badge text-bg-primary rounded-pill">{entry.points ?? 0} pts</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
