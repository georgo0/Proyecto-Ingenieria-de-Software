// src/models/Vocabulario.js
import mongoose from 'mongoose';

const vocabularioSchema = new mongoose.Schema({
    palabra: { // palabra en inglés, ej: "Apple"
        type: String,
        required: true,
        trim: true
    },
    imagen: { // ruta a la imagen de la palabra
        type: String,
        required: true
    },
    // Referencia a la unidad a la que pertenece este vocabulario
    unidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidad',
        required: true
    }
});

export default mongoose.model('Vocabulario', vocabularioSchema);