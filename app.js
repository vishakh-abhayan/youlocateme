const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/youlocateme";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api", apiRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
