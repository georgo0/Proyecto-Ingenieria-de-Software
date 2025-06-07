import App from './App.js';
import 'dotenv/config';
import {connectDB} from './mongodb.js';

connectDB();
App.listen(3000, () => {
    console.log('Server is running on port 3000');
});



