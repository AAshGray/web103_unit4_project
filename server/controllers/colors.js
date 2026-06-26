import { pool } from '../config/database.js'

export const getColors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM colors ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getColorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM colors WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Color not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}