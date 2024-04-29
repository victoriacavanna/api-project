import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

//middleware
app.use(express.json());
app.use('/api', userRoutes);


//routes 
app.get('/', (req, res) => {
    res.send("Inicio");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conexión con base de datos establecida"))
.catch((error) => console.error(error));


app.listen(port, () => console.log('Puerto:', port));
