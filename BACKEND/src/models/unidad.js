// src/models/Unidad.js
import mongoose from 'mongoose';

const unidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        required: true,
        index: true 
    }
}, {
    collection: 'unidades'
}
);

export default mongoose.model('Unidad', unidadSchema);