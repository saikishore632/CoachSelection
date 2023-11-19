const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add the body parsing middleware
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// Database configuration
const dbConfig = {
  user: 'root',
  password: 'password',
  host: 'localhost',
  port: 3306,
  database: 'react',
};

// Create a pool to manage database connections
const pool = mysql.createPool(dbConfig);
const poolConnect = pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully!');
    connection.release(); // Release the connection back to the pool
  }
});

// API routes for login and signup
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    await poolConnect;

    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (result.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        // User found, you can send a success response here
        res.json({ message: 'Login successful' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// API routes for coaches
app.get('/api/coaches', async (req, res) => {
  try {
    // Fetch the list of coaches from the database
    const query = 'SELECT * FROM coaches';
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching coaches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('request body',req.body);
    console.log('username',username); // Output: "john_doe"
    console.log(email);    // Output: "john@example.com"
    console.log(password); // Output: "secretpassword"
    await poolConnect;

    // First, check if the user with the given email already exists
    const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
    pool.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (result.length > 0) {
        res.status(409).json({ error: 'User already exists' });
      } else {
        // User does not exist, insert the new user
        const insertUserQuery = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
        pool.query(insertUserQuery, [username, email, password], (err, result) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            // You can send a success response here
            res.json({ message: 'Signup successful' });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/api/health', (req, res) => {
    res.send('Backend is healthy!'); // Send the string as the response
  });