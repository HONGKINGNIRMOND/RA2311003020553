const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service Running ");
});

app.use("/notifications", require("./routes/notification.routes"));

module.exports = app;