import { getBasketFromDatabase, updateStock } from './MariaDB.js'; 
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import encryptString from './encryption.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());


app.get('/', async (req, res) => {
try {	
  const products = await getBasketFromDatabase();
 res.json(products);
} catch (error) {
  console.error("Fejl ved hentning af data fra database:", error);
  res.status(500).json({ error: "Der opstod en fejl ved hentning af data." });
}});


app.post('/', async (req, res) => {
    let order = req.body; 
    
    const dir = path.join(process.cwd(), 'logs', 'receivedOrders');
    fs.mkdirSync(dir, { recursive: true });

  
    const pbkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
    const filePath = path.join(dir, `${Date.now()}.gpg`);
    
    try {
      const encryptedMessage = await encryptString(JSON.stringify(order, null, 2), pbkey);
      fs.writeFileSync(filePath, encryptedMessage);  
      console.log("Added new order as encrypted data");
      
      await updateStock(order);
      res.status(201).send('Order received and stock updated');
  } catch (error) {
      console.error("Error during order processing:", error);

      // Attempt to save the raw JSON as a fallback
      const fallbackPath = path.join(dir, `${Date.now()}.rawjson`);
      fs.writeFileSync(fallbackPath, JSON.stringify(order, null, 2));
      console.log(fallbackPath);
      res.status(500).send('Failed to process order');
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

