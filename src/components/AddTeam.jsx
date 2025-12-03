import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/teams", { teamName })
      .then(() => {
        alert("Team added!");
        navigate("/teams"); // redirect to Teams page
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Team</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Team Name</label>
          <input 
            type="text"
            className="form-control"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Add Team
        </button>
      </form>
    </div>
  );
}
