import express from "express";
import mongoose from "mongoose";
import { produceMessage } from "./producer";
import { consumeMessages } from "./consumer";

const app = express();
const PORT = 3001;

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/music-player");

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// Register User Endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();

  // Produce a message to Kafka
  await produceMessage("auth", "New user registered");

  res.status(201).send(user);
});

// Start the Kafka consumer
consumeMessages("auth");

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
