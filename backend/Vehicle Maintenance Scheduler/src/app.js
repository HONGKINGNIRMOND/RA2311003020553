const express = require("express");
const app = express();

const scheduler = require("./controller/scheduler");

// ✅ Root route (fixes 404 on /)
app.get("/", (req, res) => {
    res.send("Vehicle Scheduler API Running ");
});

// ✅ Main API
app.get("/run", scheduler.runScheduler);

module.exports = app;