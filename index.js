// Importing Node modules and initializing Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config/main');

// Import routers
const routerAuth = require('./routes/Auth');
const routerUser = require('./routes/User');
const routerResult = require('./routes/Result');
const routerMeet = require('./routes/Meet');
const routerSavedMeet = require('./routes/SavedMeet');
const routerTeam = require('./routes/team');


// Database Connection
mongoose.connect(config.database, { useMongoClient: true });

// app.use(express.static(path.resolve(__dirname, 'client/build')));

// Start the server
const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Setting up basic middleware for all Express requests
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

// Implementing routers
routerAuth(app);
routerUser(app);
routerResult(app);
// Unless we rework the endpoints,
// routerSavedMeet MUST come before routerMeet
routerSavedMeet(app);
routerMeet(app);
routerTeam(app);
