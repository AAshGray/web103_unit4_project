import { pool } from '../config/database.js'

export const getCustomCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM customCars ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCustomCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM customCars WHERE id = $1', [id]);
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
        const { modelId, colorId, roofId, wheelId, interiorId, totalPrice, description, submittedBy } = req.body;
        const submittedOn = new Date().toISOString();
        const result = await pool.query(
            'INSERT INTO customCars (modelId, colorId, roofId, wheelId, interiorId, totalPrice, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [modelId, colorId, roofId, wheelId, interiorId, totalPrice, description, submittedBy, submittedOn]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export const updateCustomCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { modelId, colorId, roofId, wheelId, interiorId, totalPrice, description, submittedBy } = req.body;
        const result = await pool.query(
            'UPDATE customCars SET modelId = $1, colorId = $2, roofId = $3, wheelId = $4, interiorId = $5, totalPrice = $6, description = $7, submittedBy = $8 WHERE id = $9 RETURNING *',
            [modelId, colorId, roofId, wheelId, interiorId, totalPrice, description, submittedBy, id]
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
        const result = await pool.query('DELETE FROM customCars WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom car not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}