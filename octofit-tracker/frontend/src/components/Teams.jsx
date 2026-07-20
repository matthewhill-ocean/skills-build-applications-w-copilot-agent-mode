import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchCollection('teams');
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-body-secondary">Loading teams...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <div className="list-group list-group-flush">
          {teams.map((team) => (
            <div className="list-group-item px-0" key={team._id ?? team.name}>
              <h3 className="h6 mb-1">{team.name ?? 'Unnamed Team'}</h3>
              <p className="mb-2 text-body-secondary">{team.description ?? 'No description provided.'}</p>
              <div className="small">
                Captain: {team.captain?.name ?? 'Unknown'} | Members: {team.members?.length ?? 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
