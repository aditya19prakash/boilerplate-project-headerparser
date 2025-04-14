// index.js

// Load environment variables
require('dotenv').config();

// Initialize Express
var express = require('express');
var app = express();

// Enable CORS (Cross-Origin Resource Sharing) for remote testing
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files (e.g., CSS, JS) from the 'public' directory
app.use(express.static('public'));

// Root route serving the index.html page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle header parsing and return relevant data
app.get('/api/whoami', function (req, res) {
  const userAgent = req.get('User-Agent');  // Get the user's user-agent
  const language = req.get('Accept-Language');  // Get the user's language preference
  const ipAddress = req.ip;  // Get the user's IP address

  // Return the parsed data as a JSON response
  res.json({
    ipaddress: ipAddress,
    language: language,
    software: userAgent
  });
});

// Your first API endpoint (simple hello message for testing purposes)
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Start the server and listen for requests on a specific port
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
