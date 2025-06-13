
import 'dotenv/config'; 
import app from './App.js';
import { connectDB } from './mongodb.js';

connectDB();

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});



