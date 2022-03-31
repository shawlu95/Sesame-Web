const express = require("express");
const path = require("path");
const app = express();
const connectDB = require('./db/connect');

app.use(
  express.static(
    path.resolve(__dirname, "../client/build")));
app.use(express.json());

// security
const cors = require('cors');
app.use(cors());

// documentation
const swagger = require('swagger-ui-express');
const yaml = require('yamljs');
const doc = yaml.load('doc.yaml')

const contractRouter = require('./routes/contractRoutes');
const playerRouter = require('./routes/playerRoutes');
const creditRouter = require('./routes/creditRoutes');
const nodeRouter = require('./routes/nodeRoutes');

app.use('/api/v1/contract', contractRouter);
app.use('/api/v1/player', playerRouter);
app.use('/api/v1/credit', creditRouter);
app.use('/api/v1/node', nodeRouter);
app.use('/', swagger.serve, swagger.setup(doc));

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