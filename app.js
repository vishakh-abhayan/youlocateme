const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require("cors");
require("dotenv").config();
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/youlocateme";

app.use(cors());
app.use(express.json());

logger.info("Connecting to MongoDB at " + MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("MongoDB connected port 27017!"))
  .catch((err) => logger.warn(err));

app.use("/api/v1", apiRoutes);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
