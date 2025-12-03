import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useParams } from "react-router-dom";

export default function PlayerDetails() {
  const { teamId, playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    api.get(`/teams/${teamId}`)
      .then(res => {
        const found = res.data.players.find(p => p._id === playerId);
        setPlayer(found);
      })
      .catch(err => console.error(err));
  }, [teamId, playerId]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{player.name}</h2>
      <p><strong>Age: </strong> {player.age}</p>
      <p>
        <strong>Signature Agents: </strong> 
        {player.signatureAgentsPlayed.join(", ")}
      </p>
    </div>
  );
}
