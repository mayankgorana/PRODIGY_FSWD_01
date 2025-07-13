// packages
import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import jsonwebtoken from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

// Express Server
const app = express();
const PORT = 3000;

// Hasing a password
const saltRounds = 10;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection String
mongoose.connect("mongodb://localhost:27017/userData");
let db = mongoose.connection;
db.once("open", function () {
  console.log("Mongodb Connected");
});

// Middleware for frontend connection
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/userData" }),
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 1 } // 1 hour
}));


// MongoDB Schema
let userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

let User = mongoose.model("User", userSchema);

// Login Route
app.post("/login", async (req, res) => {
  // Fetching user entered data
  const {email, password} = req.body;

  try {
    // Finding Existing User
    const existingUser = await User.findOne({ email });

    // Invalid User
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Comparing entered password and existing password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      res.status(200).json({ message: "User Authorized Successfully" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(" Registration error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
