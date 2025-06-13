import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const cursoSchema = new mongoose.Schema({
    nivel: {
        type: Number,
        required: [true, "El nivel del curso es obligatorio."]
    },
    letra: {
        type: String,
        required: [true, "La letra del curso es obligatoria."],
        trim: true,
        uppercase: true,
        maxLength: [1, "La letra solo puede tener un caracter."]
    },
    codigo: {
        type: String,
        required: true,
        default: () => nanoid(6).toUpperCase(),
        unique: true,
        index: true
    },
    // Referencia al profesor que creó el curso
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true
    },
    // Lista de alumnos inscritos en el curso
    alumnos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno'
    }]
}, { 
    timestamps: true 
});

export default mongoose.model('Curso', cursoSchema);