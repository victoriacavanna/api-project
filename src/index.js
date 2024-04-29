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
    res.send("Welcome to my api");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connection established"))
.catch((error) => console.error(error));


app.listen(port, () => console.log('listening on port', port));
