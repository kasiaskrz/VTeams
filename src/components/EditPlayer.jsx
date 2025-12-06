import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function EditPlayer() {
  const { teamId, playerId } = useParams();
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [agents, setAgents] = useState("");

  useEffect(() => {
    api.get(`/teams/${teamId}`)
      .then(res => {
        const player = res.data.players.find(p => p._id === playerId);
        setAge(player.age);
        setAgents(player.signatureAgentsPlayed.join(", "));
      });
  }, [teamId, playerId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPlayer = {
      age: Number(age),
      signatureAgentsPlayed: agents
        .split(",")
        .map(a => a.trim())
        .filter(a => a !== "")
    };

    api.put(`/teams/${teamId}/players/${playerId}`, updatedPlayer)
      .then(() => {
        alert("Player updated!");
        navigate(`/teams/${teamId}/players/${playerId}`);
      });
  };

  return (
    <div className="form-container">
      <h2>Edit Player</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Signature Agents (comma separated)</label>
          <input
            className="form-control"
            value={agents}
            onChange={(e) => setAgents(e.target.value)}
            placeholder="e.g. Jett, Reyna, Killjoy"
          />
        </div>

        <button className="vteam-btn">Save Changes</button>
      </form>
    </div>
  );
}
