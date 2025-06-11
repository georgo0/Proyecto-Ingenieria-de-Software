// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Alumno from '../models/alumno.js';
import Profesor from '../models/Profesor.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role === 'alumno') {
                req.user = await Alumno.findById(decoded.id).select('-password');
            } else if (decoded.role === 'profesor') {
                req.user = await Profesor.findById(decoded.id).select('-password');
            }

            if (!req.user) {
                return res.status(401).json({ message: 'No autorizado, usuario no encontrado.' });
            }

            next();

        } catch (error) {
            return res.status(401).json({ message: 'No autorizado, token inválido.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no se encontró token.' });
    }
};