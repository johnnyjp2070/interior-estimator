const express = require('express');
const connectDB = require('./config/db');
const users = require('./api/routes/users');

const app = express();

app.use(express.json({ extended: false }));
app.use('/users', users);

// Connect Database

connectDB();

app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
