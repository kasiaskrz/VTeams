import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [region, setRegion] = useState("");             
  const [championships, setChampionships] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamData = {
      teamName: teamName,
      region: region,                                   
      championships: championships
        .split(",")
        .map((c) => c.trim())
    };

    api.post("/teams", teamData)
      .then(() => {
        alert("Team created!");
        navigate("/teams");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Create Team</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Team Name</label>
          <input
            className="form-control"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Region</label>
          <input
            className="form-control"
            placeholder="e.g. EMEA, NA, APAC"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Championships (comma separated)</label>
          <input
            className="form-control"
            value={championships}
            onChange={(e) => setChampionships(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Create Team</button>
      </form>
    </div>
  );
}
