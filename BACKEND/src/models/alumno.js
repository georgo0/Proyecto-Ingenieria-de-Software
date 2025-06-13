import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const alumnoSchema = new mongoose.Schema({
    nombre_completo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    puntaje: { type: Number, default: 0 },
    curso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Curso',
            default: null 
}
}, { collection: 'alumnos' }
);

// Hook para hashear la contraseña antes de guardar
alumnoSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('Alumno', alumnoSchema);