require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const historyRoutes = require("./routes/taskHistory");
const { configDotenv } = require("dotenv");
const cors = require("cors");
const PORT = 3000;
configDotenv();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/history", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
