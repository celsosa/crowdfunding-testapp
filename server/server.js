require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// MySQL database connection configuration
const db = mysql.createConnection({
  host: "localhost", // host
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: "crowdfunding", // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL server successfully.");
});

// Middleware to verify admin JWT token
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
}

// Middleware to verify API key from Partner Authority Service
function verifyApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.PARTNER_API_KEY) {
    return res.status(401).send("Invalid or missing API key");
  }
  return next();
}

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, users) => {
      if (error) {
        return res.status(500).send("Server error");
      }
      if (users.length === 0) {
        return res.status(401).send("User not found");
      }

      const user = users[0];
      console.log("Hash from DB:", user.password_hash);
      console.log("Password provided:", password);
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) {
          return res.status(500).send("Error verifying password");
        }
        if (isMatch && user.is_admin) {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ token });
        } else {
          res.status(401).send("Incorrect password or not an admin");
        }
      });
    }
  );
});

// Route to add a new campaign (accessible only by admins)
app.post("/addCampaign", verifyAdminToken, (req, res) => {
  const { id, name, description, goalUsd } = req.body;
  const query =
    'INSERT INTO Campaigns (id, name, description, goal_usd, status) VALUES (?, ?, ?, ?, "active")';

  db.query(query, [id, name, description, goalUsd], (error, results) => {
    if (error) {
      return res.status(500).send("Error adding campaign");
    }
    res.status(200).send("Campaign added successfully");
  });
});

// Route to insert a donation
app.post("/donate", (req, res) => {
  const { campaignId, donatorNickname, amount } = req.body;

  db.query(
    "CALL InsertDonation(?, ?, ?)",
    [campaignId, donatorNickname, amount],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error processing donation");
      }
      res.status(200).send("Donation processed successfully");
    }
  );
});

// Route to mark a donator as fraud (accessible only by Partner Authority Service)
app.post("/markAsFraud", verifyApiKey, (req, res) => {
  const { donatorNickname } = req.body;

  db.query(
    "CALL MarkDonatorAsFraud(?)",
    [donatorNickname],
    (error, results) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send("Donator marked as fraud successfully");
    }
  );
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
