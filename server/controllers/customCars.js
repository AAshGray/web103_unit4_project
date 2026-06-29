import { pool } from '../config/database.js'

export const getCustomCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM customcars ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCustomCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM customcars WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Custom car not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export const createCustomCar = async (req, res) => {
    try {
        const { modelid, colorid, roofid, wheelid, interiorid, totalprice, description, submittedby } = req.body;
        const submittedOn = new Date().toISOString();
        const result = await pool.query(
            'INSERT INTO customcars (modelid, colorid, roofid, wheelid, interiorid, totalprice, description, submittedby, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [modelid, colorid, roofid, wheelid, interiorid, totalprice, description, submittedby, submittedOn]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export const updateCustomCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { modelid, colorid, roofid, wheelid, interiorid, totalprice, description, submittedby } = req.body;
        const result = await pool.query(
            'UPDATE customcars SET modelid = $1, colorid = $2, roofid = $3, wheelid = $4, interiorid = $5, totalprice = $6, description = $7, submittedby = $8 WHERE id = $9 RETURNING *',
            [modelid, colorid, roofid, wheelid, interiorid, totalprice, description, submittedby, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom car not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export const deleteCustomCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('DELETE FROM customcars WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom car not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}