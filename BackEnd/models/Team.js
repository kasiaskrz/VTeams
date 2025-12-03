import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  signatureAgentsPlayed: [String]
});

const teamSchema = new mongoose.Schema({
  teamName: String,
  region: String,               
  players: [playerSchema],
  championships: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Team", teamSchema);
