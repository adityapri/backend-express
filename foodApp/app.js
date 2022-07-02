const express = require('express')
const cookieParser = require('cookie-parser')

const app = express();
app.listen(3000);

app.use(express.json());
app.use(cookieParser())



const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');


//base router
app.use('/users',userRouter);
app.use('/auth',authRouter);




















