
const express = require('express');
const cors = require('cors'); // You need to install cors with npm install cors
const path =require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory (if you have any)
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to '/submit-form'
app.post('/submit-form', (req, res) => {
   const { name, phone, email, subject, message } = req.body;
   
    // Example of simple validation
   // if (!name || !email || !phone || !subject || !message) { // Basic validation
   //   return res.status(400).send('All fields are required.');
   //}

    // Log the form submission data
   console.log(`Received form submission: Name - ${name}, Phone - ${phone}, Email - ${email}, Subject - ${subject}, Message - ${message}`);
   
    // Here you can process the form submission (e.g., send an email, save to database, etc.)

   res.send('Form submission received!');
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});














