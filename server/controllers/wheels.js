import { pool } from '../config/database.js'

export const getWheels = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM wheels ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error fetching wheels:', error);
    res.status(500).json({ error: error.message });
  }
}

export const getWheelById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM wheels WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Wheel not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}