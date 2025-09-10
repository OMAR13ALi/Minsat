import { connectToDatabase } from '../config/db.js';

const db = await connectToDatabase();
export async function createUser(username, email, userClass) {
  const pool = await connectToDatabase();
  await pool.execute(
    'INSERT INTO users (username, email, class, status) VALUES (?, ?, ?, ?)',
    [username, email, userClass,0]
  );
}
/**
 * Récupère un utilisateur par email
 */
export async function findUserByEmail(email) {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows;
}

/**
 * Récupère un utilisateur par ID
 */

/**
 * Met à jour la date de dernière connexion
 */
export const updateLoginDate = (id, loginDate, callback) => {
  const sql = `UPDATE users SET login_at = ? WHERE id = ?`;
  db.query(sql, [loginDate, id], callback);
};
/**
 * Désactive l’utilisateur s’il n’a pas été actif depuis plus d’un mois
 */
export const deactivateUser = (id, callback) => {
  const sql = `UPDATE users SET status = 0 WHERE id = ?`;
  db.query(sql, [id], callback);
};
/**
 * Valide un agent en corrigeant sa classe et en mettant à jour son statut
 */
export const validateUser = (userId, correctClass, status, callback) => {
  const query = 'UPDATE users SET class = ?, status = ? WHERE id = ?';
  db.query(query, [correctClass, status, userId], callback);
};
export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results || []);
    });
  });
};

/**
 * Récupère tous les utilisateurs sans inclure le mot de passe
 */

export async function getAllUsers() {
  const pool = await connectToDatabase();
  const [rows] = await pool.execute(
    'SELECT username, email, class, status, login_at FROM users'
  );
  return rows;
}
export const updateUserPassword = (id, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    db.query(sql, [hashedPassword, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
