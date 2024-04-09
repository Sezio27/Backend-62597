//import productsData from './data/products.json';

import getBasketFromDatabase from './MariaDBDatabase.js';
import express from 'express';
import cors from 'cors';

//export const products = productsData;


//const express = require('express');
//const cors = require('cors');
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
  const products = getBasketFromDatabase();
  //res.send('Velkommen til Gruppe23s Node.js server!');
//  res.json({ products });
 // res.sendFile("/home/torben/Backend-62597/data/products.json");
 res.json(products);
});



app.post('/order', (req, res) => {
    const order = req.body; // Here, you'd process the order data
    console.log(order); // For now, we'll just log it to the console
    res.status(201).send('Order received as order');
});


app.post('/', (req, res) => {
    const order = req.body; // Here, you'd process the order data
    console.log(order); // For now, we'll just log it to the console
    res.status(201).send('Order received');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Your existing code for routes and other middleware

app.use(cors({
    origin: 'http://localhost:5173' // Only allow requests from your React app's origin
  })); 
