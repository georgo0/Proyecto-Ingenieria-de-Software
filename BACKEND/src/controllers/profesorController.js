import Profesor from '../models/Profesor.js';
import Alumno from '../models/alumno.js'; 
import jwt from 'jsonwebtoken';

// Funcion para registrar un nuevo profesor

export const registerProfesor = async (req, res) => {
    try {
        const { nombre_completo, email, password } = req.body;

        if (!nombre_completo || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        const [profesorExists, alumnoExists] = await Promise.all([
            Profesor.findOne({ email }),
            Alumno.findOne({ email })
        ]);

        if (profesorExists || alumnoExists) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso." });
        }


        const newProfesor = new Profesor({
            nombre_completo,
            email,
            password,
        });

        await newProfesor.save();

        const token = jwt.sign(
            { id: newProfesor._id, role: 'profesor' }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                _id: newProfesor._id,
                nombre_completo: newProfesor.nombre_completo,
                email: newProfesor.email,
                role: 'profesor'
            }
        });

    } catch (error) {
        console.error("Error en el controlador de registro de profesor:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};


