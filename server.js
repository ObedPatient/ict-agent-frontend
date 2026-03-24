const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use('/static', express.static('static'));

// Serve HTML files
app.get('*', (req, res) => {
  // Remove leading slash and .html extension if needed
  let filePath = req.path === '/' ? 'index.html' : req.path;
  
  // Check if it's a template file
  if (filePath.includes('.html')) {
    res.sendFile(path.join(__dirname, 'templates', filePath));
  } else {
    // For API routes, you'll proxy to your Django backend
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`Frontend running at http://localhost:${port}`);
});
