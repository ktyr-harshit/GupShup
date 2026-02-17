const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BugReport = require("../models/BugReport");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "234548343118-jaofp1sntu3uqcnomsjurjgj6aoooblv.apps.googleusercontent.com"
);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "234548343118-jaofp1sntu3uqcnomsjurjgj6aoooblv.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        password: "google-oauth-user",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google authentication failed" });
  }
});

// 🔥 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User created", token });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 SET-USERNAME
router.post("/set-username", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "supersecretkey");

    const { personalUsername } = req.body;

    if (!personalUsername) {
      return res.status(400).json({ message: "Username required" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ personalUsername });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { personalUsername },
      { new: true }
    );

    res.json({
      message: "Username set successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// 🔥 REPORT BUG
router.post("/report-bug", async (req, res) => {
  try {
    const { email, title, details } = req.body;

    if (!email || !title || !details) {
      return res.status(400).json({ message: "Fill the required fields" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Incorrect credential" });
    }

    await BugReport.create({
      email,
      title,
      details,
    });

    return res.status(201).json({ message: "Submitted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to submit bug report right now" });
  }
});

// 🔥 LIST BUG REPORTS (ADMIN)
router.get("/bug-reports", async (_req, res) => {
  try {
    const reports = await BugReport.find().sort({ createdAt: -1 });
    return res.json({ reports });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to fetch bug reports" });
  }
});

// 🔥 MARK BUG REPORT RESOLVED (ADMIN)
router.patch("/bug-reports/:id/resolve", async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await BugReport.findByIdAndUpdate(
      id,
      { status: "resolved" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Bug report not found" });
    }

    return res.json({ message: "Bug report marked as resolved", report: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to resolve bug report" });
  }
});

module.exports = router;
