//import productsData from './data/products.json';

import getBasketFromDatabase from './MariaDBDatabase.js';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import encryptString from 'encryption.js'

//export const products = productsData;


//const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

/*
// Allowed Origins5
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176'
]; // Add Origins

// Enable CORS for all requests
app.use(cors({
  origin: allowedOrigins
}));
*/

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

  
    pbkey = 
    `-----BEGIN PGP PUBLIC KEY BLOCK-----

    mI0EZfQizQEEAMe+zKJW7hlN09G1CI0e1vih3MLBzjWx/xpdwYCOTYqZsKfXI/LD
    rO+BXrP0B2a1EI7i9xMqqmuxiMd8v6fqDLu2SFRqFxX6GD8IDpn+eRkysPKr3oRJ
    zv/JwLktwj/9vpnDteP1drXBUV/yw/DMZk3qvjQvHWCsOmBvwRkJ3/JXABEBAAG0
    Z1NlcnZlcktleSAoVGhpcyBrZXkgaXMgdGhlIGtleSBmb3IgdGhlIGVuY3J5dXB0
    aW9uIG9mIGRhdGEgYmV0d2VlbiB0aGUgbWlkZGxlbGF5ZXIgYW5kIHRoZSBzcWwg
    bWFyaWFkYimIzgQTAQoAOBYhBFPaTxXzq6NBye8uDAS6uLvYB13PBQJl9CLNAhsD
    BQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJEAS6uLvYB13P23AD/jHf9YRqQ0Yh
    rrkm04Rydt6bx+DGKiGbV1dJKeIiMZWzAYEW3pZCEmGKZqLzkgvISZ5J9p6iGPfh
    MApAriLjoBobNOB9sUCIA8osUWm7rpB7ctoUynHQ8PhKgrAIhzyBjFI9kAkrLjkI
    TO5RhuFYbg//Vp/rjl6FK1bkAAAjc+kSuI0EZfQizQEEAKDwplq+XQI7soF82eZ+
    QKbolO1bOa/s7utAfZjtWsjGlGaE9uo8GcY5yQS6hwGbSMFBgthbX+I83XEKbbrP
    AYKc7Br81ZcbyYyl8K8ywQ/7bR0125If38Yd+YqxB192jClWIiKWCVa+N2N/5zu+
    +orLlMwEXwJ/fHrJDSBopiePABEBAAGItgQYAQoAIBYhBFPaTxXzq6NBye8uDAS6
    uLvYB13PBQJl9CLNAhsMAAoJEAS6uLvYB13Pr8QEAIp/rLIYF6n9vNy5+SiwKOnJ
    OIOgxI++bigwq5d/ThDCmPSTeHCJtjNblR6tYymGznOWeAsPhjXi93oyPuPb6ksh
    IWveEPVQ61al4SuWO4XDTSfrNU6uwtOxwCPDa1GaTi7JZSRUK8o4G+sEFb/7js2L
    Z0ZcKNSVQMDTwridA9DK
    =8ux1
    -----END PGP PUBLIC KEY BLOCK-----`
  
    
    encryptString(order, publicKey).then(encryptedMessage => {
      console.log("Encrypted message:", encryptedMessage);
      order = encryptedMessage
    }).catch(error => {
      console.error("Error during encryption:", error);
    });

    const filePath = path.join(dir, `${Date.now()}test.json`);
  
    fs.writeFileSync(filePath, JSON.stringify(order, null, 2));

    res.status(201).send('Order received');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

