import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [region, setRegion] = useState("");
  const [championships, setChampionships] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamData = {
      teamName,
      region,
      logoUrl,
      championships: championships
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c !== ""),
    };

    api
      .post("/teams", teamData)
      .then(() => {
        alert("Team created!");
        navigate("/teams");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container">
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

        <div className="mb-3">
          <label>Team Logo URL</label>
          <input
            type="text"
            className="form-control"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://upload.wikimedia.org/wikipedia/en/2/25/Shopify_Rebellion.svg"
          />
        </div>

        <button className="vteam-btn">Create Team</button>
      </form>
    </div>
  );
}
