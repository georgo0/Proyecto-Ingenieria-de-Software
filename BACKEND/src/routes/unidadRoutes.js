// src/routes/unidadRoutes.js
import express from 'express';
import { getUnidadesByNivel } from '../controllers/unidadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/nivel/:nivel', protect, getUnidadesByNivel);

export default router;