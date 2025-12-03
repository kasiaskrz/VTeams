import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// GET all teams
router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// ⭐ NEW: GET single team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new team
router.post("/", async (req, res) => {
  const team = await Team.create(req.body);
  res.json(team);
});

// NEW: POST add player to a team
router.post("/:id/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    // If team already has 5 players → do NOT allow adding more
    if (team.players.length >= 5) {
      return res.status(400).json({ error: "Team already has 5 players" });
    }

    // Add the new player
    team.players.push(req.body);

    await team.save();
    res.json(team);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT update team
router.put("/:id", async (req, res) => {
  const updated = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE remove team
router.delete("/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Team deleted" });
});

export default router;
