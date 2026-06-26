import { pool } from '../config/database.js'

export const getRoofs = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM roofs ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error fetching roofs:', error);
    res.status(500).json({ error: error.message });
  }
}

export const getRoofById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM roofs WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Roof not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}