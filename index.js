const express = require("express");
const connectDB = require("./config/db");
const users = require("./api/routes/users");
const auth = require("./api/auth");
const authAdmin = require("./api/routes/admin");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));
app.use("/users", users);
app.use("/auth", auth);
app.use("/admin", authAdmin);

// Connect Database

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
