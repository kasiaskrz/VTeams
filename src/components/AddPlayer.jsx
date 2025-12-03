import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPlayer() {
    const { teamId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [agents, setAgents] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const player = {
            name,
            age: Number(age),
            signatureAgentsPlayed: agents.split(",").map((a) => a.trim())
        };

        api.post(`/teams/${teamId}/players`, player)
            .then(() => {
                alert("Player added!");
                navigate("/teams");
            })
            .catch(err => {
                alert(err.response?.data?.error || "Error adding player");
            });

    };

    return (
        <div className="container mt-4">
            <h2>Add Player</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Player Name</label>
                    <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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
                        placeholder="e.g. Jett, Reyna, KJ"
                    />
                </div>

                <button className="btn btn-primary">Add Player</button>
            </form>
        </div>
    );
}
