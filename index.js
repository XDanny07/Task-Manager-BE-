require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const historyRoutes = require("./routes/taskHistory");
const { configDotenv } = require("dotenv");
const cors = require("cors");
const app = express();

// app.use(cors());
const PORT = 3000;
configDotenv();

app.use((err, req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://task-manager-dun-two.vercel.app"
  );
  res.status(500).json({ error: "Internal Server Error" });
});
// Middleware
app.use(bodyParser.json());
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/history", historyRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
