import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from '../infrastructure/Routes/UserRoutes'
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BlogManagement');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, 
};

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors( corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', userRouter);

app.listen(PORT,()=>{
    console.log("Server is running on port: "+PORT);
})