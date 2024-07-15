import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user";
import { auth } from "./middleware/auth";
import { produceMessage } from "./producer";
import { consumeMessages } from "./consumer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

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

// Login User Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("Invalid username or password.");
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(400).send("Invalid username or password.");
  }

  const token = user.generateAuthToken();
  res.send({ token });
});

// Logout User Endpoint
app.post("/logout", auth, async (req, res) => {
  // Handle token invalidation here if using a token blacklist or other method
  res.send("Logged out successfully.");
});

// Start the Kafka consumer
consumeMessages("auth");

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
