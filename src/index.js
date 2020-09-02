require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes.js");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:wJx4F3Y2yRxQaa3@cluster0.gxohr.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (error) => {
  console.log("Error", error);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Running 3000");
});
