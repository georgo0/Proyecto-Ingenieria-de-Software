import Alumno from '../models/alumno.js';
import Profesor from '../models/Profesor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Este controlador maneja el inicio de sesión tanto para alumnos como para profesores

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "El email y la contraseña son requeridos." });
        }

        let user = null;
        let role = '';

        user = await Alumno.findOne({ email });
        if (user) {
            role = 'alumno';
        }

        if (!user) {
            user = await Profesor.findOne({ email });
            if (user) {
                role = 'profesor';
            }
        }

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                nombre_completo: user.nombre_completo,
                email: user.email,
                role: role
            }
        });

    } catch (error) {
        console.error("Error en el login unificado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};