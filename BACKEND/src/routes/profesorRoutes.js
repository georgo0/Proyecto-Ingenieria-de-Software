
import express from 'express';
import { registerProfesor } from '../controllers/profesorController.js';

const router = express.Router();

router.post('/register', registerProfesor);

export default router;