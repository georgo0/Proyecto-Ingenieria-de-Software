import express from 'express';
import { 
    createCourse, 
    joinCourse, 
    getCourseById, 
    getMyTeacherCourses,
    getCourseLeaderboard
} from '../controllers/cursoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCourse);
router.post('/join', protect, joinCourse);


router.get('/my-courses', protect, getMyTeacherCourses);

router.get('/:id', protect, getCourseById);

router.get('/:id/leaderboard', protect, getCourseLeaderboard);


export default router;