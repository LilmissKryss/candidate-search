const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

// Enable compression
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any request that doesn't match a static file, serve index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Get the port from the environment variable or use 10000 as default
const port = process.env.PORT || 10000;

// Start the server
app.listen(port, '0.0.0.0', function() {
  console.log('Server running on port ' + port);
});
