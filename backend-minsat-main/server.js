// server.js
import { connectToDatabase } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

try {
  const db =  connectToDatabase(); // <-- tu obtiens l'objet `db` ici

  // Si tu veux l’injecter globalement :
  global.db = db;

  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  });

} catch (err) {
  console.error('❌ Erreur au démarrage du serveur :', err.message);
  process.exit(1);
}
