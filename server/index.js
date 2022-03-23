const express = require("express");
const path = require("path");
const app = express();
const connectDB = require('./db/connect');

app.use(
  express.static(
    path.resolve(__dirname, "../client/build")));
app.use(express.json());

const contractRouter = require('./routes/contractRoutes');
const playerRouter = require('./routes/playerRoutes');
const creditRouter = require('./routes/creditRoutes');
const nodeRouter = require('./routes/nodeRoutes');

app.get('/', async (req, res) => res.send('OK'));
app.use('/api/v1/contract', contractRouter);
app.use('/api/v1/player', playerRouter);
app.use('/api/v1/credit', creditRouter);
app.use('/api/v1/node', nodeRouter);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port);
    console.log(`Listening on port ${port}...`);
  } catch (error) {
    console.log('Failed to start server...');
  }
};

start();