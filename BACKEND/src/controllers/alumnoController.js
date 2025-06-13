import Alumno from '../models/alumno.js';
import jwt from 'jsonwebtoken'; 
import Profesor from '../models/Profesor.js'; 

// Este controlador maneja el registro de un nuevo alumno y la obtención de sus cursos.

export const registerStudent = async (req, res) => {
    try {
        const { nombre_completo, email, password } = req.body;

        if (!nombre_completo || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        const [alumnoExists, profesorExists] = await Promise.all([
            Alumno.findOne({ email }),
            Profesor.findOne({ email })
        ]);

        if (alumnoExists || profesorExists) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso." });
        }


        const newStudent = new Alumno({
            nombre_completo,
            email,
            password,
        });

        const savedStudent = await newStudent.save();

        const token = jwt.sign(
            { id: savedStudent._id, role: 'alumno' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                _id: savedStudent._id,
                nombre_completo: savedStudent.nombre_completo,
                email: savedStudent.email,
                role: 'alumno'
            }
        });

    } catch (error) {
        console.error("Error en el controlador de registro de alumno:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};


export const getMyCourses = async (req, res) => {
    try {
        const student = await Alumno.findById(req.user._id).populate('curso');

        if (!student) {
            return res.status(404).json({ message: "Alumno no encontrado." });
        }

        res.status(200).json(student.curso);

    } catch (error) {
        console.error("Error al obtener los cursos del alumno:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

