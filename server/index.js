const express = require("express");
const path = require("path");
const app = express();

app.use(
  express.static(
    path.resolve(__dirname, "../client/build")));
app.use(express.json());

const contractRouter = require('./routes/contractRoutes');
const userRouter = require('./routes/userRoutes');

app.get('/', async (req, res) => res.send('OK'));
app.use('/api/v1/contract', contractRouter);
app.use('/api/v1/user', userRouter);

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