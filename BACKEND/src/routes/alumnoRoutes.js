import express from 'express';
import { registerStudent } from '../controllers/alumnoController.js';
import { getMyCourses, updateMyScore } from '../controllers/alumnoController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerStudent);
router.patch('/update-score', protect, updateMyScore);


router.get('/my-courses', protect, getMyCourses);


export default router;