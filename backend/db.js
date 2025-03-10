// db.js
const mysql = require('mysql2');

// Configuración de la conexión
const pool = mysql.createPool({
  host: 'localhost',      // Dirección del servidor de la base de datos
  user: 'root',           // Usuario de la base de datos
  password: 'bodo',   // Contraseña del usuario
  database: 'rincon_db', // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar el pool de conexiones
module.exports = pool.promise();