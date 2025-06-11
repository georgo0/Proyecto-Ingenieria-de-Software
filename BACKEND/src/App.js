
import express from 'express';
import alumnoRoutes from './routes/alumnoRoutes.js';
import profesorRoutes from './routes/profesorRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import cursoRoutes from './routes/cursoRoutes.js'; 
import unidadRoutes from './routes/unidadRoutes.js'; 

const app = express();

app.use(express.json());

app.use('/api/alumnos', alumnoRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/unidades', unidadRoutes);

export default app;

