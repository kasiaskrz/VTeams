import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { Link } from "react-router-dom";

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api.get("/teams")
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>

      {teams.map(team => (
        <div
          key={team._id}
          className="border rounded p-3 mb-3 shadow-sm"
        >
          <h4>{team.teamName}</h4>

          <p><strong>Region:</strong> {team.region}</p>

          {team.championships?.length > 0 && (
            <p><strong>Championships:</strong> {team.championships.join(", ")}</p>
          )}

          <div>
            <strong>Players:</strong>
            <ul>
              {team.players?.map(player => (
                <li key={player._id}>
                  <Link
                    to={`/teams/${team._id}/players/${player._id}`}
                    className="text-decoration-none"
                  >
                    {player.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex gap-2 mt-2">
            {team.players.length < 5 ? (
              <Link
                className="btn btn-success btn-sm"
                to={`/teams/${team._id}/players/add`}
              >
                Add Player
              </Link>
            ) : (
              <button className="btn btn-secondary btn-sm" disabled>
                Team Full (5/5)
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
