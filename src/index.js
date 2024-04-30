import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'

const app = express();
const port = process.env.PORT || 3000;


dotenv.config(); //carga variables de .env

//middleware
app.use(express.json());

//rutas de usuario
app.use('/api', userRoutes);

//ruta de inicio 
app.get('/', (req, res) => {
    res.send("Inicio");
});

//conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conexión con base de datos establecida"))
.catch((error) => console.error(error));


app.listen(port, () => console.log('Puerto:', port));
