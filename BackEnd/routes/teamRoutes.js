import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// GET all teams
router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// POST create new team
router.post("/", async (req, res) => {
  const team = await Team.create(req.body);
  res.json(team);
});

// PUT update team
router.put("/:id", async (req, res) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE remove team
router.delete("/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Team deleted" });
});

export default router;
