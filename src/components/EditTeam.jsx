import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function EditTeam() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [region, setRegion] = useState("");
    const [championships, setChampionships] = useState("");

    useEffect(() => {
        api.get(`/teams/${id}`)
            .then(res => {
                setTeamName(res.data.teamName);
                setRegion(res.data.region);
                setChampionships(res.data.championships.join(", "));
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTeam = {
            teamName,
            region,
            championships: championships
                .split(",")
                .map(c => c.trim())
                .filter(c => c !== "")
        };

        api.put(`/teams/${id}`, updatedTeam)
            .then(() => {
                alert("Team updated!");
                navigate("/teams");
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="form-container">
            <h2>Edit Team</h2>

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

                <button className="vteam-btn">Save Changes</button>
            </form>
        </div>
    );
}
