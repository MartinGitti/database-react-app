// Requirements:
// Init express:
const express = require('express');
// Require for cross sharing:
const cors = require('cors');
// Require to connect to mongoDB database:
const mongoose = require('mongoose');

// Gain access to env file that holds sensitive data:
require('dotenv').config();

// Init express server:
const app = express();
// Port that server will be listening on:
const port = process.env.PORT || 8080;

// Middleware:
// Enable cross sharing:
app.use(cors());
// body-parser included in new version of Express:
// Parse json:
app.use(express.json());

// database uri:
const uri = process.env.ATLAS_URI;
// Pass in uri where database is stored:
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
);
// Once connected to database, log in console: 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully established!");
})

// Require files:
const carsRouter = require('../controllers/cars.controller');

// Use Required Files:
app.use('/cars', carsRouter);

// Server will listen on port 8080:
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

