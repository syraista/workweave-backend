const mysql = require('mysql2/promise');

const config = {
  host: "localhost",
  user: "root",
  password: "1304",
  database: "workweavedb",
  connectTimeout: 60000
};

async function testConnection() {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Connection successful!');
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
