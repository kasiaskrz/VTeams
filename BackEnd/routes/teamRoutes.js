import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const team = await Team.create(req.body);
  res.json(team);
});

router.post("/:id/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team.players.length >= 5) {
      return res.status(400).json({ error: "Team already has 5 players" });
    }

    team.players.push(req.body);

    await team.save();
    res.json(team);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const updated = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Team deleted" });
});

router.delete("/:teamId/players/:playerId", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    team.players = team.players.filter(
      (p) => p._id.toString() !== req.params.playerId
    );

    await team.save();
    res.json({ message: "Player deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:teamId/players/:playerId", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    const player = team.players.id(req.params.playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    player.age = req.body.age;
    player.signatureAgentsPlayed = req.body.signatureAgentsPlayed;

    await team.save();
    res.json(player);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
