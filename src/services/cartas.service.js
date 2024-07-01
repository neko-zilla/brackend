import { pool } from '../db.js';
import {io} from '../index.js'

export const canjearCarta = async (id_mazo, id_usuario, propietario) => {
  try {
    // Verificar si hay cartas en el mazo con cantidad mayor a cero
    const [cartas] = await pool.query('SELECT * FROM cartas WHERE id_mazo_fk = ? AND num_disponible > 0', [id_mazo]);
    if (cartas.length === 0) {
      return { success: false, message: 'No hay cartas disponibles en el mazo' };
    }

    // Seleccionar una carta aleatoriamente
    const cartaSeleccionada = cartas[Math.floor(Math.random() * cartas.length)];

    // Actualizar la disponibilidad de la carta
    await pool.query('UPDATE cartas SET num_disponible = num_disponible - 1 WHERE id_carta = ?', [cartaSeleccionada.id_carta]);

    // Insertar registro en historial_cartas
    const [result] = await pool.query('INSERT INTO historial_cartas (id_carta_fk, id_usuario_fk, propietario) VALUES (?, ?, ?)', [cartaSeleccionada.id_carta, id_usuario, propietario]);
    io.emit('cartaCanjeada', { id_historial: result.insertId, carta: cartaSeleccionada });
    
    return { success: true, id_historial: result.insertId, carta: cartaSeleccionada };
  } catch (error) {
    console.error('Error al canjear la carta:', error);
    throw new Error('Error interno del servidor');
  }
};