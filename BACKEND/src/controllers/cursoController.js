// src/controllers/cursoController.js
import Curso from '../models/curso.js';
import Alumno from '../models/alumno.js'; 

// Este controlador maneja la creación de cursos, unirse a un curso y obtener información sobre los cursos.

export const createCourse = async (req, res) => {
    try {
        const { nivel, letra } = req.body;

        if (!nivel || !letra) {
            return res.status(400).json({ message: "El nivel y la letra del curso son requeridos." });
        }

        const profesorId = req.user._id;

        const newCourse = new Curso({
            nivel,
            letra,
            profesor: profesorId
        });

        const savedCourse = await newCourse.save();

        res.status(201).json(savedCourse);

    } catch (error) {
        if (error.code === 11000) {
             return res.status(409).json({ message: "Error al generar código único, por favor intenta de nuevo." });
        }
        console.error("Error al crear el curso:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};




export const joinCourse = async (req, res) => {
    try {
        const { codigo } = req.body;
        const studentId = req.user._id;

        const student = await Alumno.findById(studentId);
        if (student.curso) { 
            return res.status(400).json({ message: "Ya estás inscrito en un curso. No puedes unirte a otro." });
        }

        const course = await Curso.findOne({ codigo: codigo.toUpperCase() });
        if (!course) {
            return res.status(404).json({ message: "No se encontró ningún curso con ese código." });
        }

        
        await Curso.updateOne(
            { _id: course._id },
            { $addToSet: { alumnos: studentId } }
        );

        
        await Alumno.updateOne(
            { _id: studentId },
            { $set: { curso: course._id } } 
        );

        res.status(200).json({ message: "Te has unido al curso exitosamente.", curso: course });

    } catch (error) {
        console.error("Error al unirse al curso:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};



export const getCourseById = async (req, res) => {
    try {
        const course = await Curso.findById(req.params.id).populate('alumnos', 'nombre_completo email');

        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado." });
        }

        const userId = req.user._id.toString();
        const isTeacher = course.profesor.toString() === userId;
        

        const isStudent = course.alumnos.some(alumno => alumno._id.toString() === userId);

        if (!isTeacher && !isStudent) {
            return res.status(403).json({ message: "No tienes permiso para ver este curso." });
        }

        res.status(200).json(course);

    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};


export const getMyTeacherCourses = async (req, res) => {
    try {
        const courses = await Curso.find({ profesor: req.user._id });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error al obtener los cursos del profesor:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
