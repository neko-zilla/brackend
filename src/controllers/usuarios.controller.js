import { pool } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const createUsuario = async (req, res) => {
    const { username, password, email, id_socket } = req.body;
  
    // Genera un UUID para id_usuario
    const id_usuario = uuidv4();
  
    try {
      // Usa async/await con pool.query para ejecutar consultas SQL
      const result = await pool.query(
        'INSERT INTO usuarios (id_usuario, username, password, email, id_socket) VALUES (?, ?, ?, ?, ?)',
        [id_usuario, username, password, email, id_socket]
      );
  
      res.status(201).json({ message: 'Usuario creado correctamente', id_usuario });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  };

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    await pool.query('UPDATE usuarios SET username = ?, password = ?, email = ? WHERE id_usuario = ?', [username, password, email, id]);
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};