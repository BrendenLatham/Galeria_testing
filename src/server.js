// src/server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

const mongoURI = 'mongodb+srv://Galeria:Uu0dxoceIGwf3qA1@galeria.hdzdkkc.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'users';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('server online');
});

// Define a route to check login credentials
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('login_credentials'); // Change 'users' to your collection name

    const user = await collection.findOne({ username });

    if (user) {
      // User found, verify password with bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, login successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ message: 'Login failed, double check credentials' });
      }
    } else {
      // User not found, login failed
      res.status(401).json({ message: 'Login failed' });
    }

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('login_credentials'); // Change 'users' to your collection name

    // Check if the username already exists
    const existingUser = await collection.findOne({ username });
    
    if (existingUser) {
      // Username already taken, registration failed
      res.status(409).json({ message: 'Username already exists' });
    } else {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert the new user data into the database
      await collection.insertOne({ username, password: hashedPassword });

      // Registration successful
      res.status(201).json({ message: 'Registration successful' });
    }

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/unfilled', async (req, res) => {
  console.log('Received request for /unfilled');
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('orders');
    const collection = db.collection('unfilled');

    const unfilledOrders = await collection.find({}).toArray();
    res.json(unfilledOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

