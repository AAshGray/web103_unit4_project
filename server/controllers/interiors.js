import { pool } from '../config/database.js'

export const getInteriors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM interiors ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error fetching interiors:', error);
    res.status(500).json({ error: error.message });
  }
}

export const getInteriorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM interiors WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Interior not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}