import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js'
import bodyParser from 'body-parser';
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api/auth' , authRouter);

app.listen(8082 , () =>{
    console.log('porta 8082');
})