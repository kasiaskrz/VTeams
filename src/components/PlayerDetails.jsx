import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../axiosConfig";

export default function PlayerDetails() {
  const { teamId, playerId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    api.get(`/teams/${teamId}`)
      .then(res => {
        const foundPlayer = res.data.players.find(p => p._id === playerId);
        setPlayer(foundPlayer);
      })
      .catch(err => console.error(err));
  }, [teamId, playerId]);

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this player?")) return;

    api.delete(`/teams/${teamId}/players/${playerId}`)
      .then(() => {
        alert("Player deleted.");
        navigate(`/teams`);
      })
      .catch(err => console.error(err));
  };

  if (!player) return <p className="text-center mt-4">Loading player...</p>;

  return (
    <div className="profile-card">
      <h2 className="profile-name">{player.name}</h2>

      <p><strong>Age:</strong> {player.age}</p>

      <p>
        <strong>Signature Agents:</strong>{" "}
        {player.signatureAgentsPlayed?.length > 0
          ? player.signatureAgentsPlayed.join(", ")
          : "None"}
      </p>

      <div className="profile-actions">
        <Link
          className="btn btn-warning"
          to={`/teams/${teamId}/players/${playerId}/edit`}
        >
          Edit Player
        </Link>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Player
        </button>
      </div>
    </div>
  );
}
