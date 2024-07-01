import { pool } from '../db.js';

// Obtener todos los mazos
export const getMazos = async (req, res) => {
  try {
    const [rows, fields] = await pool.promise().query('SELECT * FROM mazos');
    res.json(rows); // Devolver los resultados como un arreglo JSON
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un mazo por ID
export const getMazoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows, fields] = await pool.promise().query('SELECT * FROM mazos WHERE id_mazo = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Mazo no encontrado' });
    } else {
      res.json(rows[0]); // Devolver el primer resultado encontrado
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo mazo
export const createMazo = async (req, res) => {
  const { id_usuario_fk, nombre, valorbits } = req.body;

  try {
    const [result] = await pool.promise().execute('INSERT INTO mazos (id_usuario_fk, nombre, valorbits) VALUES (?, ?, ?)', [id_usuario_fk, nombre, valorbits]);
    const insertedId = result.insertId;
    res.json({ id: insertedId, id_usuario_fk, nombre, valorbits });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un mazo existente
export const updateMazo = async (req, res) => {
  const { id } = req.params;
  const { nombre, valorbits } = req.body;

  try {
    const [result] = await pool.promise().execute('UPDATE mazos SET nombre = ?, valorbits = ? WHERE id_mazo = ?', [nombre, valorbits, id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Mazo no encontrado' });
    } else {
      res.json({ id, nombre, valorbits });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un mazo
export const deleteMazo = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.promise().execute('DELETE FROM mazos WHERE id_mazo = ?', [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Mazo no encontrado' });
    } else {
      res.json({ message: 'Mazo eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};