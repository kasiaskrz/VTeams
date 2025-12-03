import { useEffect, useState } from "react";
import api from "../axiosConfig";

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api.get("/teams")
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Teams</h2>

      {teams.length === 0 && <p>No teams yet.</p>}

      {teams.map(team => (
        <div 
          key={team._id}
          className="p-3 my-2 border rounded"
        >
          <h4>{team.teamName}</h4>
        </div>
      ))}
    </div>
  );
}
