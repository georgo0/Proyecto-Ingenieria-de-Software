// src/routes/unidadRoutes.js
import express from 'express';
import { getUnidadesByNivel, getVocabularioByUnidad, getUnidadById } from '../controllers/unidadController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/nivel/:nivel', protect, getUnidadesByNivel);
router.get('/:id/vocabulario', protect, getVocabularioByUnidad);
router.get('/details/:id', protect, getUnidadById);

export default router;