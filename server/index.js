import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import interviewRouter from './routes/interview.routes.js';
import PaymentRouter from './routes/payment.route.js';


dotenv.config();
connectDb(); 

const app = express();

app.use(cors({
  origin:"https://ai-interview-platform-73lg.onrender.com",
  credentials:true
}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/interview",interviewRouter) 
app.use("/api/payment",PaymentRouter) 


const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
      
})