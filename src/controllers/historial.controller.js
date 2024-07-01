import { pool } from '../db.js';

export const obtenerHistorialCartasController = async (req, res) => {
    const { id_usuario } = req.params; // Suponiendo que obtienes el ID de usuario de los parámetros de la solicitud
  
    try {
      const query = `
        SELECT h.id_historial, h.id_carta_fk, c.nombre as carta_nombre, h.propietario, h.fecha_creacion, m.nombre as nombre_mazo
        FROM historial_cartas h
        JOIN cartas c ON h.id_carta_fk = c.id_carta
        JOIN mazos m ON c.id_mazo_fk = m.id_mazo
        WHERE h.id_usuario_fk = ?
        ORDER BY h.fecha_creacion DESC
      `;
  
      const [historial] = await pool.query(query, [id_usuario]);
  
      res.status(200).json(historial);
    } catch (error) {
      console.error('Error al obtener el historial de cartas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };