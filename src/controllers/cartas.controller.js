import {pool} from '../db.js';
import { canjearCarta} from '../services/cartas.service.js';


export const getCartas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cartas');
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCartaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cartas WHERE id_carta = ?', [id]);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('Carta not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCarta = async (req, res) => {
  const { nombre, num_disponible, id_mazo_fk } = req.body;
  try {
    const result = await pool.query('INSERT INTO cartas (nombre, num_disponible, id_mazo_fk) VALUES (?, ?, ?)', [nombre, num_disponible, id_mazo_fk]);
    res.json({ id: result.insertId, nombre, num_disponible, id_mazo_fk });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCarta = async (req, res) => {
  const { id } = req.params;
  const { nombre, num_disponible, id_mazo_fk } = req.body;
  try {
    const result = await pool.query('UPDATE cartas SET nombre = ?, num_disponible = ?, id_mazo_fk = ? WHERE id_carta = ?', [nombre, num_disponible, id_mazo_fk, id]);
    if (result.affectedRows > 0) {
      res.json({ id, nombre, num_disponible, id_mazo_fk });
    } else {
      res.status(404).send('Carta not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCarta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cartas WHERE id_carta = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Carta deleted successfully' });
    } else {
      res.status(404).send('Carta not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const canjearCartaController = async (req, res) => {
    const { id_mazo, id_usuario, propietario } = req.body;
    
    try {
      const resultadoCanje = await canjearCarta(id_mazo, id_usuario, propietario);
  
      if (resultadoCanje.success) {
        res.status(201).json({
          message: 'Carta canjeada exitosamente',
          id_historial: resultadoCanje.id_historial,
          carta: resultadoCanje.carta
        });
      } else {
        res.status(404).json({ message: resultadoCanje.message });
      }
    } catch (error) {
      console.error('Error al canjear la carta desde el controlador:', error);
      res.status(500).json({ message: error.message });
    }
  };
