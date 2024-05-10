import  mariadb from 'mariadb';

const connectionConfig = {
    host: '127.0.0.1',
    user: 'baend_user',
    password: 'fed_Pille_box',
    database: 'MyDatabase'  
};

async function getBasketFromDatabase() {
 
    let conn;
    try {
        conn = await mariadb.createConnection(connectionConfig);
        const results = await conn.query('SELECT * FROM basket;');
        return results;  // Directly return the query results
    } catch (error) {
        console.error('Error fetching basket data:', error);
        throw error;  // Rethrow or handle error appropriately
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

async function updateStock(order) {
    let conn;

    try {
      
      conn = await mariadb.createConnection(connectionConfig);
      await conn.beginTransaction(); // Start a transaction
  
      const checkQuery = 'SELECT stock FROM stock WHERE id = ?;';
      const updateQuery = 'UPDATE stock SET stock = stock - ? WHERE id = ? AND stock >= ?;';

      const itemList = order.items      

      for (const item of itemList) {
            const [results] = await conn.query(checkQuery, [item.product.id]);
            
            if (!results) {
                throw new Error(`No stock found for ID: ${item.product.id}`);
            }
            const currentStock = results.stock;

            if (currentStock < item.quantity) {
                throw new Error(`Not enough stock for ID: ${item.product.id}. Available: ${currentStock}, Required: ${item.quantity}`);
            }
            const updateResult = await conn.query(updateQuery, [item.quantity, item.product.id, item.quantity]);
            if (updateResult.affectedRows === 0) {
                throw new Error(`Failed to update stock for ID: ${item.product.id}`);
            }
        }
  
      await conn.commit(); // Commit the transaction
      console.log('Stock updated successfully');
    } catch (error) {
        console.error('Failed to update stock:', error);
        if (conn) {
            await conn.rollback(); // Rollback the transaction on error
        }
        throw error; // Rethrow the error to be handled by the caller
    } finally {
        if (conn) {
            await conn.end(); // Always close the connection
        }
    }
}
  

export {getBasketFromDatabase, updateStock};