import  mariadb from 'mariadb';

async function getBasketFromDatabase() {
    const conn = mariadb.createConnection({
     host: '127.0.0.1',
     user: 'baend_user',
     password: 'grey45'
    });
   
    try {
     const res = await (await conn).query('USE shop_database;');
     console.log(res);
     const res1 = await (await conn).query('select * from basket;');
     console.log(res1);
     return res1;
    } finally {
     (await conn).end();
    }
   }
   