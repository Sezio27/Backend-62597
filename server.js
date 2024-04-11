//import productsData from './data/products.json';

import getBasketFromDatabase from './MariaDBDatabase.js';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

//export const products = productsData;


//const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all requests
app.use(cors({
  origin: 'http://localhost:5173' // Only allow requests from your React app's origin
}));
// Middleware to parse JSON bodies
app.use(express.json());


// Eksempel på en route handler for root stien '/'
app.get('/', async (req, res) => {
try {	
  const products = await getBasketFromDatabase();
// console.log({products});		
 
 res.json({ products });
} catch (error) {
  console.error("Fejl ved hentning af data fra database:", error);
  res.status(500).json({ error: "Der opstod en fejl ved hentning af data." });
}});


app.post('/', (req, res) => {
    const order = req.body; 
    console.log(order); 

    const dir = path.join(process.cwd(), 'logs', 'receivedOrders');
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(order, null, 2));

    res.status(201).send('Order received');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

