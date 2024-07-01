import mysql from 'mysql2/promise'; 
// Configuración de la conexión a la base de datos
export const pool = mysql.createPool({
  host: 'localhost',     // Cambia según la configuración de tu base de datos
  user: 'root',          // Cambia según tu nombre de usuario de la base de datos
  password: '',          // Cambia según tu contraseña de la base de datos
  database: 'cartas',    // Cambia según el nombre de tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar el pool de conexiones