const express = require("express");
const path = require("path");
const app = express();

app.use(
  express.static(
    path.resolve(__dirname, "../client/build")));
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('OK');
})

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    app.listen(port);
    console.log(`Listening on port ${port}...`);
  } catch (error) {
    console.log('Failed to start server...');
  }
};

start();