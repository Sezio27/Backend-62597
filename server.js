//import productsData from './data/products.json';

//export const products = productsData;


const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all requests
app.use(cors());
// Middleware to parse JSON bodies
//app.use(express.json());

// Route to handle POST requests for orders
//app.post('/order', (req, res) => {
 //   const order = req.body; // Here, you'd process the order data
 //   console.log(order); // For now, we'll just log it to the console
//    res.status(201).send('Order received');
//});

// Eksempel på en route handler for root stien '/'
app.get('/', (req, res) => {
  //res.send('Velkommen til Gruppe23s Node.js server!');
//  res.json({ products });
  res.sendFile("/home/torben/Backend-62597/data/products.json");
});

// Definerer en route for GET /api forespørgsler
app.get('/kurv', (req, res) => {
    // Sender et svar tilbage til klienten
    //res.json({ message: 'Velkommen til vores API!' });
    res.send('Velkommen til vores API!');
  })

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Your existing code for routes and other middleware

app.use(cors({
    origin: 'http://localhost:5173' // Only allow requests from your React app's origin
  })); 
