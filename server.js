require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB Connection Error:", err);
});

db.once("open", () => {
    console.log("MongoDB Connected Successfully!");
});

// Home Route - Database Connection Status
app.get("/", (req, res) => {
    const dbStatus = db.readyState === 1 ? "Connected" : "Not Connected";
    res.json({ database: dbStatus });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
