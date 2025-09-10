// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool;
export async function connectToDatabase() {
  if (!pool) {
    try {
      pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000
      });

      const connection = await pool.getConnection();
      console.log('✅ Pool MySQL initialisé avec succès');
      connection.release();
    } catch (err) {
      console.error('❌ Échec de l\'initialisation du pool MySQL :', err.message);
      throw new Error('Impossible d\'initialiser le pool MySQL : ' + err.message);
    }
  }
  console.log('✅ Retour du pool MySQL:', pool);
  return pool;
}