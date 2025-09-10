import { connectToDatabase } from '../config/db.js';

const db = await connectToDatabase();
export async function getServiceClass() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT * FROM serviceclasses'
  );
  return rows;
}
export async function uagroup() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT * FROM uagroup'
  );
  return rows;
}
export async function serviceidentifier() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT * FROM serviceidentifier'
  );
  return rows;
}
export async function offer() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT * FROM offer'
  );
  return rows;
}
export async function usagecounters() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT * FROM usagecounters'
  );
  return rows;
}
